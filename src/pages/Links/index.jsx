import React, { PureComponent } from 'react';
import { Divider, Popconfirm, Table } from 'antd';

import { Query } from '@/components/Query';
import { Mutation } from '@/components/Mutation';
import { TextButton } from '@/components/TextButton';
import { RadioSelect } from '@/components/RadioSelect';

import { LinkModal } from './LinkModal';
import { CREATE_LINK, DELETE_LINK, UPDATE_LINK } from './index.mutation';
import { GET_LINKS } from './index.query';

const { Column } = Table;

export default class Links extends PureComponent {
  state = {
    offset: 0,
    limit: 10,
    keyword: '',
    title: 'Create',
    visible: false,
    mutation: CREATE_LINK,
    name: '',
    url: ''
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

  handleClick = () => {
    this.setState({
      visible: true,
      title: 'Create',
      name: '',
      url: '',
      mutation: CREATE_LINK
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  updateRecord = ({ _id, name, url }) => {
    this.setState({
      visible: true,
      title: 'Update',
      mutation: UPDATE_LINK,
      _id,
      name,
      url
    });
  };

  render() {
    const { offset, limit, keyword, ...rest } = this.state;

    return (
      <div>
        <RadioSelect
          typeList={[]}
          onSearch={this.search}
          handleClick={this.handleClick}
        />
        <div className="content">
          <Query
            query={GET_LINKS}
            variables={{ offset, limit, keyword }}
            notifyOnNetworkStatusChange
          >
            {({ data, loading, networkStatus, refetch }) => {
              const result = (data && data.getLinks) || { docs: [], total: 0 };

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
                  >
                    <Column
                      key="name"
                      title="Name"
                      dataIndex="name"
                      width="300px"
                    />
                    <Column
                      key="url"
                      title="Url"
                      dataIndex="url"
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
                      title="Action"
                      key="action"
                      width="200px"
                      render={(text, record) => {
                        return (
                          <>
                            <TextButton
                              onClick={() => this.updateRecord(record)}
                            >
                              edit
                            </TextButton>

                            <Divider type="vertical" />
                            <Mutation
                              mutation={DELETE_LINK}
                              refetch={refetch}
                              ItemName={/^LinksItem/}
                            >
                              {({ mutation, deleteLoading }) => (
                                <Popconfirm
                                  title="Sure to delete?"
                                  onConfirm={() =>
                                    mutation({
                                      variables: { _id: record._id }
                                    })
                                  }
                                >
                                  <TextButton disabled={deleteLoading}>
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

                  <LinkModal
                    handleCancel={this.handleCancel}
                    refetch={refetch}
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
