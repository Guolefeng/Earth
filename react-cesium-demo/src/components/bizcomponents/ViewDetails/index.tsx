/**
 * @Descrption: 查看详情组件
 * @author wangcx
 * @date 2021-03-29 18:54
 */

import _ from 'lodash'
import React from 'react'
import { Descriptions, Popover } from 'antd'
import moment from 'moment'
import { useRecoilValue } from 'recoil'
import { getDict } from '@/store/selector'
import Clipboard from 'clipboard'
import { Upload } from '@/components/purecomponents'

interface IRowConfig {
    name: string;               // 每一行的key, 如engineerName
    title?: string;             // 每一行的名称, 如工程名称
    dateFormat?: string;        // 时间格式
    format?: (text: any, data?: any) => string;            // 自定义格式化
    [propsName: string]: any;   // 其他配置 保留
}

interface IDataProps {
    [propsName: string]: any;
}

interface IViewDetails {
    /** 该区块的大标题 */
    title?: string;
    /** 每一行的配置信息 */
    rowConfig?: IRowConfig[];
    /** 数据源 */
    data?: IDataProps;
    /** 想划分几列 */
    column?: number;
    /** className */
    className?: string;
    /** 其他配置 保留 */
    [descriptionProps: string]: any;
}


const ViewDetails = (props: IViewDetails) => {
    const {
        title,
        rowConfig,
        column,
        data = {},
        className = '',
        ...descriptionProps
    } = props
    // const dictStore = useDictStore()
    const clazz = `view-details-info ${className}`

    const clipboard = new Clipboard('.copy');
    clipboard.on('success', function (e) {
        e.clearSelection();
    });

    const clickLink = (link:any) => {
        window.open(link)
    }
    return (
        <div className={clazz}>
            {title
                ? <div className="details-title">
                    {title}
                </div>
                : null
            }
            <Descriptions className="details-info" column={column} {...descriptionProps}>
                {data
                    ? _.map(rowConfig, (item, key) => {
                        const { name, title: itemTitle, dictId, filterLabel, dateFormat, isRichText, isLink, isPopover, tipName, isImage, ...descItemProps } = item || {}
                        let val: any = data[name]
                        if (val || val === false || val === 0) {
                            if (dateFormat) {
                                val = val ? moment(val).format(dateFormat) : ''
                            }
                            if (dictId) {
                                let _dict = useRecoilValue(getDict(dictId))
                                if (filterLabel) {
                                    _dict = _dict.filter((e: any) => (e.label === filterLabel))
                                }
                                _.map(_dict, (value:any, key:number) => {
                                    if (value.dictValueCode === val) {
                                        val = value.dictValue

                                    }
                                })
                            }
                            if (isRichText) {
                                val = React.createElement('div', {
                                    dangerouslySetInnerHTML: { __html: data[name] }
                                })
                            }
                            if (isLink) {
                                val = <Popover
                                    placement="topLeft"
                                    content={
                                        <div>
                                            <div className="srn-ref">{data && data[name]}</div>
                                            <div className ="link copy" data-clipboard-target =".srn-ref">{'复制'}</div>
                                        </div>
                                    }
                                >
                                    <span className="link" onClick={() => { clickLink(data[name]) }}>{data && data[name]}</span>
                                </Popover>
                            }
                            if (isPopover) {
                                val = <Popover
                                    placement="topLeft"
                                    content={
                                        <div>
                                            <div className="srn-ref">{data && data[name]}</div>
                                            <div className ="link copy" data-clipboard-target =".srn-ref">{'复制'}</div>
                                        </div>
                                    }
                                    title=""
                                >
                                    <span className="link" >{tipName}</span>
                                </Popover>
                            }
                            if (isImage) {
                                val = <Upload disabled listType="picture-card" value={data[name] || []} />
                            }
                        } else {
                            val = ''
                        }
                        return <Descriptions.Item
                            key={key}
                            className="details-row"
                            label={itemTitle}
                            {...descItemProps}
                        >
                            {val}
                        </Descriptions.Item>
                    })
                    : <div />

                }
            </Descriptions>
        </div>
    )
}

export default ViewDetails

