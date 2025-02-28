import { DatePicker, ConfigProvider } from 'antd';
import React, { useState, useContext } from 'react';
import moment from 'moment';
import { useIntl } from '@ant-design/pro-provider';
import { FieldLabel, parseValueToMoment } from '@ant-design/pro-utils';
import SizeContext from 'antd/lib/config-provider/SizeContext';
import { DatePickerProps } from 'antd/lib/date-picker';
import { ProFieldFC } from '../../index';
import './index.less';

/**
 * 日期选择组件
 * @param
 */
const FieldDatePicker: ProFieldFC<{
  text: string | number;
  format: string;
  showTime?: boolean;
  bordered?: boolean;
  picker?: DatePickerProps['picker'];
}> = (
  {
    text,
    mode,
    format = 'YYYY-MM-DD',
    label,
    light,
    render,
    renderFormItem,
    plain,
    showTime,
    fieldProps,
    picker,
    bordered,
  },
  ref,
) => {
  const intl = useIntl();
  const size = useContext(SizeContext);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-field-date-picker');
  const [open, setOpen] = useState<boolean>(false);

  if (mode === 'read') {
    const dom = <span ref={ref}>{moment(text).format(format) || '-'}</span>;
    if (render) {
      return render(text, { mode, ...fieldProps }, <span>{dom}</span>);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    let dom;
    const {
      disabled,
      value,
      onChange,
      placeholder = intl.getMessage('tableForm.selectPlaceholder', '请选择'),
    } = fieldProps;
    const momentValue = parseValueToMoment(value, format) as moment.Moment;

    if (light) {
      const valueStr: string = (momentValue && momentValue.format(format)) || '';
      dom = (
        <div
          className={`${prefixCls}-light`}
          onClick={() => {
            setOpen(true);
          }}
        >
          <DatePicker
            {...fieldProps}
            picker={picker}
            showTime={showTime}
            format={format}
            ref={ref}
            value={momentValue}
            onChange={(v) => {
              if (onChange) {
                onChange(v);
              }
              setTimeout(() => {
                setOpen(false);
              }, 0);
            }}
            onOpenChange={setOpen}
            open={open}
          />
          <FieldLabel
            label={label}
            disabled={disabled}
            placeholder={placeholder}
            size={size}
            value={valueStr}
            onClear={() => {
              if (onChange) {
                onChange(null);
              }
            }}
            bordered={bordered}
            expanded={open}
          />
        </div>
      );
    } else {
      dom = (
        <DatePicker
          {...fieldProps}
          picker={picker}
          showTime={showTime}
          format={format}
          placeholder={placeholder}
          ref={ref}
          bordered={plain === undefined ? true : !plain}
          value={momentValue}
        />
      );
    }
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldDatePicker);
