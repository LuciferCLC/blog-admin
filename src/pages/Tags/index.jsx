import React, { PureComponent } from 'react';
import { Divider, Popconfirm, Table } from 'antd';

import { Query } from '@/components/Query';
import { Mutation } from '@/components/Mutation';
import { RadioSelect } from '@/components/RadioSelect';
import { TextButton } from '@/components/TextButton';

import { CREATE_TAG, DELETE_TAG, UPDATE_TAG } from './index.mutation';
import { GET_TAGS } from './index.query';
import { TagModal } from './TagModal';

const { Column } = Table;

// TODO:拖拽排序

export default class Tags extends PureComponent {
  state = {
    keyword: '',
    title: 'Create',
    visible: false,
    mutation: CREATE_TAG,
    name: '',
    descript: ''
    // sort: [],
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
      descript: '',
      mutation: CREATE_TAG
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  updateRecord = ({ _id, name, descript }) => {
    this.setState({
      visible: true,
      title: 'Update',
      mutation: UPDATE_TAG,
      _id,
      name,
      descript
    });
  };

  render() {
    const { keyword, ...rest } = this.state;
    return (
      <div>
        <RadioSelect
          typeList={[]}
          onSearch={this.search}
          handleClick={this.handleClick}
        />

        <div className="content">
          <Query
            query={GET_TAGS}
            variables={{ offset: 0, limit: 100, keyword }}
            notifyOnNetworkStatusChange
          >
            {({ data, loading, networkStatus, refetch }) => {
              const result = (data && data.getTags) || { docs: [], total: 0 };

              return (
                <>
                  <Table
                    dataSource={result.docs}
                    loading={loading || networkStatus === 4}
                    rowKey="_id"
                    pagination={false}
                  >
                    <Column
                      key="name"
                      title="Name"
                      dataIndex="name"
                      width="300px"
                    />
                    <Column
                      key="descript"
                      title="descript"
                      dataIndex="descript"
                    />

                    <Column key="count" title="Count" dataIndex="count" />

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
                              mutation={DELETE_TAG}
                              refetch={refetch}
                              ItemName={/^TagsItem/}
                            >
                              {({ mutation, loading: deleteLoading }) => (
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

                  <TagModal
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
