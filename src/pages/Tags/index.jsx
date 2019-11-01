import React, { PureComponent } from 'react';
import { Divider, Table } from 'antd';

import { RadioSelect } from '@/components/RadioSelect';
import { TextButton } from '@/components/TextButton';

import { TagModal } from './TagModal';


const { Column } = Table;

class Tags extends PureComponent {
  state = {
    keyword: '',
    title: 'Create',
    visible: false,
    name: '',
    descript: '',
    // sort: [],
  };

  search = (keyword) => {
    this.setState({
      keyword,
    });
  };

  handleClick = () => {
    this.setState({
      visible: true,
      title: 'Create',
      name: '',
      descript: '',
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  updateRecord = ({ _id, name, descript }) => {
    this.setState({
      visible: true,
      title: 'Update',
      _id,
      name,
      descript,
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
          <Table
            // dataSource={result.docs}
            // loading={loading || networkStatus === 4}
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
              render={(text, record) => (
                <>
                  <TextButton
                    onClick={() => this.updateRecord(record)}
                  >
                    edit
                  </TextButton>

                  <Divider type="vertical" />
                  {/* <MutationComponent
                    mutation={DELETE_TAG}
                    refetch={refetch}
                    ItemName={/^TagsItem/}
                  >
                    {(mutation, loading) => (
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
                    // )}
                  </MutationComponent> */}
                </>
              )}
            />
          </Table>

          <TagModal
            handleCancel={this.handleCancel}
            // refetch={refetch}
            {...rest}
          />
        </div>
      </div>
    );
  }
}

export default Tags;
