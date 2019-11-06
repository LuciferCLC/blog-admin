import React, { PureComponent } from 'react';
import { Divider, Table } from 'antd';
import dayjs from 'dayjs';

// import { MutationComponent } from '@/components/Mutation';
import { RadioSelect } from '@/components/RadioSelect';

import { ExpandedRowRender } from './ExpandedRowRender';
// import { ArticleMutations } from './ArticleMutations';

const { Column } = Table;

class Articles extends PureComponent {
  state = {
    // keyword: '',
  }

  search = (keyword) => {
    console.log(keyword);
    this.setState({
      // keyword,
    });
  };

  onChange = (e, typeName) => {
    this.setState({
      [typeName]: e.target.value,
    });
  };

  render() {
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
              render={() => (
                <>
                  {/* {record.state !== 'RELEASE' && (
                    <ArticleMutations
                      mutation={UPDATE_ARTICLE}
                      refetch={refetch}
                      ItemName={/^ArticleItem/}
                      variables={{
                        _id: record._id,
                        state: 'DRAFT',
                      }}
                      text="草 稿"
                    />
                  )} */}

                  {/* {record.state !== 'DRAFT' && (
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
                  )} */}
                  <Divider type="vertical" />
                  {/* <MutationComponent
                    mutation={DELETE_ARTICLE}
                    refetch={refetch}
                    ItemName={/^ArticleItem/}
                  >
                    {(mutation) => (
                      <Popconfirm
                        title="Sure to delete?"
                        onConfirm={
                          () => mutation({
                            variables: { _id: record._id },
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

export default Articles;
