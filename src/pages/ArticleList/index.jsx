import React, { PureComponent } from 'react';
import dayjs from 'dayjs';
import { Divider, Popconfirm, Table } from 'antd';

import { Query } from '@/components/Query';
import { Mutation } from '@/components/Mutation';
import { RadioSelect } from '@/components/RadioSelect';
import { TextButton } from '@/components/TextButton';

import { ExandedRowRender } from './ExpandedRowRender';
import { ArticleMutations } from './ArticleMutations';
import { DELETE_ARTICLE, UPDATE_ARTICLE } from './index.mutation';
import { GET_ARTICLE } from './index.query';

const { Column } = Table;

export default class Articles extends PureComponent {
  state = {
    offset: 0,
    limit: 10,
    keyword: '',
    state: 'ALL',
    publish: 'ALL',
    tag: ''
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

  render() {
    const { offset, limit, keyword, state, tag, publish } = this.state;

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
            query={GET_ARTICLE}
            variables={{ offset, limit, keyword, state, tag, publish }}
            notifyOnNetworkStatusChange
          >
            {({ data, loading, networkStatus, refetch }) => {
              const result = (data && data.getArticles) || {
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
                <Table
                  dataSource={result.docs}
                  loading={loading || networkStatus === 4}
                  rowKey="_id"
                  pagination={pagination}
                  expandedRowRender={ExandedRowRender}
                >
                  <Column key="name" title="Name" dataIndex="name" />
                  <Column
                    key="create_at"
                    title="Create_at"
                    dataIndex="create_at"
                    width="200px"
                    render={(text) => dayjs(text).format('YYYY-MM-DD hh:mm:ss')}
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
                    width="200px"
                    render={(text, record) => {
                      return (
                        <>
                          {record.state !== 'RELEASE' && (
                            <ArticleMutations
                              mutation={UPDATE_ARTICLE}
                              refetch={refetch}
                              ItemName={/^ArticleItem/}
                              variables={{
                                _id: record._id,
                                state: 'DRAFT'
                              }}
                              text="草 稿"
                            />
                          )}

                          {record.state !== 'DRAFT' && (
                            <ArticleMutations
                              mutation={UPDATE_ARTICLE}
                              refetch={refetch}
                              ItemName={/^ArticleItem/}
                              variables={{
                                _id: record._id,
                                state: 'RELEASE'
                              }}
                              text="公开"
                            />
                          )}
                          <Divider type="vertical" />
                          <Mutation
                            mutation={DELETE_ARTICLE}
                            refetch={refetch}
                            ItemName={/^ArticleItem/}
                          >
                            {({ mutation }) => (
                              <Popconfirm
                                title="Sure to delete?"
                                onConfirm={() =>
                                  mutation({
                                    variables: { _id: record._id }
                                  })
                                }
                              >
                                <TextButton disabled={loading}>
                                  delete
                                </TextButton>
                              </Popconfirm>
                            )}
                          </Mutation>
                        </>
                      );
                    }}
                  />
                </Table>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}
