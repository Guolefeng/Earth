import React, { memo } from "react";
import _ from "lodash";
import { Tooltip } from "antd";
import * as AllIcons from "@ant-design/icons";

interface IIconProps {
    /**
     * 如果是antd的icon库中的类型直接传字符串即可
     * 如果是取自定义assets/icon, 同样只需要传对应icon的名称即可
     */
    type?: string;
    title?: string;
    style?: any;
    className?: string;
    disabled?: boolean;
    spin?: boolean;
    onClick?: (e: any) => void;
}

const Icon = (props: IIconProps) => {
    const { type, title, style, onClick, ..._props } = props;
    const { className, disabled = false } = _props || {};

    if (type) {
        const TIcon = _.get(AllIcons, type);
        return TIcon ? (
            <Tooltip title={title}>
                <TIcon
                    onClick={onClick}
                    style={style}
                    {..._props}
                    className={`${className} ${disabled ? "disabled" : ""}`}
                />
            </Tooltip>
        ) : null;
    }
    return null;
};

export default memo(Icon);
