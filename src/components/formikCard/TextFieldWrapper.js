import React from "react";
import {TextField} from "@material-ui/core";

const TextFieldWrapper = (props) => {
    const {helperText, ...others} = props;

    return (
        <div>
            <TextField {...others}
            value={others.field.value}
            />
            <div>{others.form.errors[others.field.name]}</div>
        </div>
    )
}

export default TextFieldWrapper;
