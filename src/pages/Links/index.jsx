import React, { PureComponent } from 'react';
import { Divider, Table } from 'antd';

import { TextButton } from '@/components/TextButton';
import { RadioSelect } from '@/components/RadioSelect';

import { LinkModal } from './LinkModal';

const { Column } = Table;

class Links extends PureComponent {
  state = {
    offset: 0,
    limit: 10,
    keyword: '',
    title: 'Create',
    visible: false,
    name: '',
    url: '',
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
      url: '',
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  updateRecord = ({ _id, name, url }) => {
    this.setState({
      visible: true,
      title: 'Update',
      _id,
      name,
      url,
    });
  };

  render() {
    const {
      offset, limit, keyword, ...rest
    } = this.state;

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
            // pagination={pagination}
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
                <a rel="noopener noreferrer" href={text} target="_blank">
                  {text}
                </a>
              )}
            />

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
                    mutation={DELETE_LINK}
                    refetch={refetch}
                    ItemName={/^LinksItem/}
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

          <LinkModal
            handleCancel={this.handleCancel}
            // refetch={refetch}
            {...rest}
          />
        </div>
      </div>
    );
  }
}

export default Links;
