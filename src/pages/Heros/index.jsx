import React, { PureComponent } from 'react';
import { Divider, Table } from 'antd';
import dayjs from 'dayjs';

import { RadioSelect } from '@/components/RadioSelect';
// import { TextButton } from '@/components/TextButton';

import { ExpandedRowRender } from './ExpandedRowRender';


const { Column } = Table;

class Heros extends PureComponent {
  state = {
    // offset: 0,
    // limit: 10,
    // keyword: '',
    // state: 'TODO',
  };

  search = (keyword) => {
    // this.setState({
    //   keyword,
    // });
    console.log(keyword);
  };

  onChange = (e, typeName) => {
    this.setState({
      [typeName]: e.target.value,
    });
  };

  render() {
    // const {
    //   offset, limit, keyword, state
    // } = this.state;
    const typeList = [
      {
        name: '状态',
        typeName: 'state',
        list: [
          { name: '待审核', id: 'TODO' },
          { name: '审核通过', id: 'SUCCESS' },
          { name: '审核不通过', id: 'FAIL' }
        ],
        defaultValue: 'TODO',
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
          <Table
            // dataSource={result.docs}
            // loading={loading || networkStatus === 4}
            rowKey="_id"
            // pagination={pagination}
            expandedRowRender={ExpandedRowRender}
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
              render={(text, record) => (
                <>
                  {/* {record.state !== 'SUCCESS' && (
                    <HerosMutations
                      mutation={UPDATE_HERO}
                      refetch={refetch}
                      ItemName={/^HerosItem/}
                      variables={{
                        _id: record._id,
                        state: 'SUCCESS'
                      }}
                      text="通 过"
                    />
                  )} */}
                  {record.state === 'TODO' && (
                    <Divider type="vertical" />
                  )}

                  {/* {record.state !== 'FAIL' && (
                    <HerosMutations
                      mutation={UPDATE_HERO}
                      refetch={refetch}
                      ItemName={/^HerosItem/}
                      variables={{
                        _id: record._id,
                        state: 'FAIL'
                      }}
                      text="不通过"
                    />
                  )} */}
                  <Divider type="vertical" />
                  {/* <MutationComponent
                    mutation={DELETE_HERO}
                    refetch={refetch}
                    ItemName={/^HerosItem/}
                  >
                    {mutation => (
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
                  </MutationComponent> */}
                </>
              )}
            />
          </Table>
        </div>
      </div>
    );
  }
}

export default Heros;
