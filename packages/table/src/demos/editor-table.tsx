import React, { useRef, useState } from 'react';
import { Tag, Space } from 'antd';
import { EditorProTable, ProColumns, ActionType } from '@ant-design/pro-table';
import ProField from '@ant-design/pro-field';

interface GithubIssueItem {
  id: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  created_at: string;
}

const defaultData: GithubIssueItem[] = [
  {
    id: 624748504,
    title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
    labels: [{ name: 'bug', color: 'error' }],
    created_at: '2020-05-26T09:42:56Z',
    state: 'processing',
  },
  {
    id: 624691229,
    title: '🐛 [BUG]无法创建工程npm create umi',
    labels: [{ name: 'bug', color: 'error' }],
    created_at: '2020-05-26T08:19:22Z',
    state: 'closed',
  },
  {
    id: 624674790,
    title: '🧐 [问题] build 后还存在 es6 的代码（Umi@2.13.13）',
    labels: [{ name: 'question', color: 'success' }],
    state: 'open',
    created_at: '2020-05-26T07:54:25Z',
  },
];

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: '30%',
    search: false,
  },
  {
    title: '状态',
    dataIndex: 'state',
    initialValue: 'open',
    filters: true,
    valueType: 'select',
    width: 120,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: '标签',
    dataIndex: 'labels',
    width: 80,
    render: (_, row) => (
      <Space>
        {row.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '创建时间',
    key: 'created_at',
    dataIndex: 'created_at',
    valueType: 'date',
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, row, _, action) => [
      <a
        key="editor"
        onClick={() => {
          action.setEditor?.(row.id);
        }}
      >
        编辑
      </a>,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [dataSource, setDataSource] = useState<GithubIssueItem[]>([]);
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <ProField
        mode="read"
        valueType="jsonCode"
        fieldProps={{
          style: {
            flex: 1,
          },
        }}
        text={JSON.stringify(dataSource)}
      />
      <EditorProTable<GithubIssueItem>
        rowKey="id"
        style={{
          flex: 2,
        }}
        columns={columns}
        actionRef={actionRef}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        dataSource={dataSource}
        onChange={setDataSource}
        rowEditor={{
          type: 'multiple',
        }}
      />
    </div>
  );
};
