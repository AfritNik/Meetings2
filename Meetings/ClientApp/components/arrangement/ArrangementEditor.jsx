import * as React from "react";
import bind from 'bind-decorator';
import { Form } from "@Components/shared/Form";
import { Formik } from 'formik';
//import { DatePicker } from "react-datepicker";

export default class ArrangementEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    elForm;

    @bind
    emptyForm() {
        if (this.elForm) {
            this.elForm.emptyForm();
        }
    }

    componentDidMount() {
    }

    render() {

        return <Formik
            enableReinitialize={true}
            initialValues={{
                caption: this.props.data.caption || ''
            }}
            onSubmit={(values, { setSubmitting }) => {
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                    <Form className="form" ref={x => this.elForm = x}>
                        <input type="hidden" name="id" defaultValue={(this.props.data.id || 0).toString()} />
                        <div className="form-group">
                            <label className="control-label required" htmlFor="arrangement__caption">Caption</label>
                            <input
                                type="text"
                                className="form-control"
                                id="arrangement__caption"
                                name="caption"
                                data-value-type="string"
                                data-val-required="true"
                                data-msg-required="Caption is required."
                                value={values.caption}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                       
                    </Form>)}
        </Formik>;
    }
}

