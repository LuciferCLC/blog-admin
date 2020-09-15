import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';

import { Search } from './Search';

import styles from './index.module.scss';

export const RadioSelect = ({ typeList, onChange, onSearch, ...props }) => (
  <div className={styles['radio-list']}>
    {onChange &&
      typeList.map((types) => (
        <div className={styles['radio-item']} key={types.name}>
          <span>{types.name}：</span>
          <Radio.Group
            defaultValue={types.defaultValue}
            buttonStyle="solid"
            className={styles['ant-radio-group']}
            onChange={(e) => onChange(e, types.typeName)}
          >
            {types.list.map((item) => (
              <Radio.Button
                value={item.id}
                key={item.id}
                className={styles['ant-radio-button']}
              >
                {item.name}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
      ))}
    {onSearch && <Search {...props} onSearch={onSearch} />}
  </div>
);

RadioSelect.propTypes = {
  typeList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};
