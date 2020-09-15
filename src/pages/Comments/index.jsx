import React, { PureComponent } from 'react';
import dayjs from 'dayjs';
import { Divider, Popconfirm, Table } from 'antd';

import { Query } from '@/components/Query';
import { Mutation } from '@/components/Mutation';
import { RadioSelect } from '@/components/RadioSelect';
import { TextButton } from '@/components/TextButton';

import { ExandedRowRender } from './ExpandedRowRender';
import { CommentsMutations } from './CommentsMutations';
import { ComponentsModal } from './CommentModal';
import { DELETE_COMMENT, UPDATE_COMMENT } from './index.mutation';
import { GET_COMMENTS } from './index.query';

const { Column } = Table;

export default class Comments extends PureComponent {
  state = {
    _id: '',
    visible: false,
    content: '',
    author: {
      name: '',
      email: '',
      site: ''
    },
    offset: 0,
    limit: 10,
    keyword: '',
    state: 'TODO'
  };

  pageChange = (page) => {
    this.setState({
      offset: Number(`${(page - 1) * 10}`)
    });
  };

  search = (keyword) => {
    this.setState({
      keyword
    });
  };

  onChange = (e, typeName) => {
    this.setState({
      [typeName]: e.target.value
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  updateRecord = ({ _id, content, author }) => {
    this.setState({
      visible: true,
      _id,
      content,
      author
    });
  };

  render() {
    const { offset, limit, keyword, state, ...rest } = this.state;

    const typeList = [
      {
        name: '状态',
        typeName: 'state',
        list: [
          { name: '待审核', id: 'TODO' },
          { name: '审核通过', id: 'SUCCESS' },
          { name: '审核不通过', id: 'FAIL' }
        ],
        defaultValue: 'TODO'
      }
    ];

    return (
      <div>
        <RadioSelect
          typeList={typeList}
          onSearch={this.search}
          onChange={this.onChange}
        />

        <div className="content">
          <Query
            query={GET_COMMENTS}
            variables={{ offset, limit, keyword, state }}
            notifyOnNetworkStatusChange
          >
            {({ data, loading, networkStatus, refetch }) => {
              const result = (data && data.getComments) || {
                docs: [],
                total: 0
              };

              const pagination = {
                total: result.total,
                pageSize: limit,
                onChange: this.pageChange,
                showTotal: (total) => `共 ${total} 条`
              };

              return (
                <>
                  <Table
                    dataSource={result.docs}
                    loading={loading || networkStatus === 4}
                    rowKey="_id"
                    pagination={pagination}
                    expandedRowRender={ExandedRowRender}
                  >
                    <Column
                      key="post_id"
                      title="articleId"
                      dataIndex="post_id"
                      width="80"
                    />
                    <Column
                      key="name"
                      title="Name"
                      dataIndex="author.name"
                      width="120"
                    />
                    <Column
                      key="email"
                      title="Email"
                      dataIndex="author.email"
                      width="120"
                    />
                    <Column
                      key="site"
                      title="Site"
                      dataIndex="author.site"
                      width="120"
                      render={(text) => (
                        <a
                          rel="noopener noreferrer"
                          href={text}
                          target="_blank"
                        >
                          {text}
                        </a>
                      )}
                    />
                    <Column
                      key="create_at"
                      title="Create_at"
                      dataIndex="create_at"
                      width="200px"
                      render={(text) =>
                        dayjs(text).format('YYYY-MM-DD hh:mm:ss')
                      }
                    />
                    <Column
                      key="state"
                      title="State"
                      dataIndex="state"
                      width="100px"
                    />

                    <Column
                      title="Action"
                      key="action"
                      width="300px"
                      render={(text, record) => {
                        return (
                          <>
                            <TextButton
                              onClick={() => this.updateRecord(record)}
                            >
                              edit
                            </TextButton>

                            <Divider type="vertical" />
                            {record.state !== 'SUCCESS' && (
                              <CommentsMutations
                                mutation={UPDATE_COMMENT}
                                refetch={refetch}
                                ItemName={/^CommentsItem/}
                                variables={{
                                  _id: record._id,
                                  state: 'SUCCESS'
                                }}
                                text="通 过"
                              />
                            )}
                            {record.state === 'TODO' && (
                              <Divider type="vertical" />
                            )}

                            {record.state !== 'FAIL' && (
                              <CommentsMutations
                                mutation={UPDATE_COMMENT}
                                refetch={refetch}
                                ItemName={/^CommentsItem/}
                                variables={{
                                  _id: record._id,
                                  state: 'FAIL'
                                }}
                                text="不通过"
                              />
                            )}
                            <Divider type="vertical" />
                            <Mutation
                              mutation={DELETE_COMMENT}
                              refetch={refetch}
                              ItemName={/^CommentsItem/}
                            >
                              {(mutation) => (
                                <Popconfirm
                                  title="Sure to delete?"
                                  onConfirm={() =>
                                    mutation({
                                      variables: {
                                        _id: record._id,
                                        post_id: record.post_id
                                      }
                                    })
                                  }
                                >
                                  <TextButton disabled={loading}>
                                    Delete
                                  </TextButton>
                                </Popconfirm>
                              )}
                            </Mutation>
                          </>
                        );
                      }}
                    />
                  </Table>

                  <ComponentsModal
                    handleCancel={this.handleCancel}
                    mutation={UPDATE_COMMENT}
                    {...rest}
                  />
                </>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}
