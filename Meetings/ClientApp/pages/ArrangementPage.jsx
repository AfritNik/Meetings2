import "@Styles/main.scss";
import * as React from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router";
import * as ArrangementStore from "@Store/ArrangementStore";
import { connect } from "react-redux";
import { PagingBar } from "@Components/shared/PagingBar";
import ArrangementEditor from "@Components/arrangement/ArrangementEditor";
import Loader from "@Components/shared/Loader";
import bind from 'bind-decorator';
import { ModalComponent } from "@Components/shared/ModalComponent";
import AwesomeDebouncePromise from "awesome-debounce-promise";


class ArrangementPage extends React.Component {

    pagingBar;

    elModalAdd;
    elModalEdit;
    elModalDelete;

    arrangementEditorAdd;
    arrangementEditorEdit;

    debouncedSearchFn;

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: "",
            pageNum: 1,
            limitPerPage: 5,
            rowOffset: 0,
            modelForEdit: {}
        };

        this.debouncedSearchFn = AwesomeDebouncePromise(term => {
            props.searchRequest(term);
        }, 500);
    }

    componentWillMount() {
        this.props.searchRequest();
    }

    componentWillUnmount() {
        if (this.elModalAdd) {
            this.elModalAdd.hide();
        }
        if (this.elModalEdit) {
            this.elModalEdit.hide();
        }
        if (this.elModalDelete) {
            this.elModalDelete.hide();
        }
    }

    @bind
    onChangePage(pageNumber) {
        let rowOffset = Math.ceil((pageNumber - 1) * this.state.limitPerPage);
        this.setState({ pageNumber, rowOffset });
    }

    @bind
    onClickShowAddModal(event) {
        this.elModalAdd.show();
    }

    @bind
    onClickShowEditModal(event, modelForEdit) {
        this.setState({ modelForEdit });
        this.elModalEdit.show();
    }

    @bind
    onClickShowDeleteModal(event, modelForEdit) {
        this.setState({ modelForEdit });
        this.elModalDelete.show();
    }

    @bind
    async onClickArrangementEditorAdd__saveBtn(event) {
        event.preventDefault();

        if (!this.arrangementEditorAdd.elForm.isValid()) {
            // Form is not valid.
            return;
        }

        var result =
            await this.props.addRequest(this.arrangementEditorAdd.elForm.getData());

        if (!result.hasErrors) {
            this.pagingBar.setLastPage();
            this.elModalAdd.hide();
        }
    }

    @bind
    async onClickArrangementEditorEdit__saveBtn(event) {
        if (!this.arrangementEditorEdit.elForm.isValid()) {
            // Form is not valid.
            return;
        }

        var data = this.arrangementEditorEdit.elForm.getData();

        var result = await this.props.updateRequest(data);

        if (!result.hasErrors) {
            this.elModalEdit.hide();
        }
    }

    @bind
    onClickArrangementEditorDelete__saveBtn(event) {
        this.props.deleteRequest(this.state.modelForEdit.id);
        this.elModalDelete.hide();
    }

    @bind
    renderRow(arrangement) {
        return <tr key={arrangement.id}>
            <td>{arrangement.caption}</td>
            <td>
                <button className="btn btn-info" onClick={x => this.onClickShowEditModal(x, arrangement)}>Edit</button>&nbsp;
                <button className="btn btn-danger" onClick={x => this.onClickShowDeleteModal(x, arrangement)}>Delete</button>
            </td>
        </tr>;
    }

    @bind
    renderRows(arrangementModels) {
        return arrangementModels
            .slice(this.state.rowOffset, this.state.rowOffset + this.state.limitPerPage)
            .map(x => this.renderRow(x));
    }

    @bind
    onChangeSearchInput(event) {
        var val = event.currentTarget.value;
        this.debouncedSearchFn(val);
        this.pagingBar.setFirstPage();
    }

    render() {

        return <div>
            <Helmet>
                <title>Arrangement - RCB (JavaScript)</title>
            </Helmet>

            <Loader show={this.props.indicators.operationLoading} />

            <div className="panel panel-default">
                <div className="panel-body row">
                    <div className="col-sm-1">
                        <button className="btn btn-success" onClick={this.onClickShowAddModal}>Add</button>
                    </div>
                    <div className="col-sm-11">
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={""}
                            onChange={this.onChangeSearchInput}
                            placeholder={"Search for arrangements..."}
                        />
                    </div>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Caption</th><th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows(this.props.arrangements)}
                </tbody>
            </table>

            {/* Add modal */}
            <ModalComponent
                ref={x => this.elModalAdd = x}
                buttons={<div>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={this.onClickArrangementEditorAdd__saveBtn}>Save</button>
                </div>}
                title="Add arrangement"
                onHide={() => {
                    if (this.arrangementEditorAdd) {
                        this.arrangementEditorAdd.emptyForm();
                    }
                }}>
                <ArrangementEditor ref={x => this.arrangementEditorAdd = x} data={{}} />
            </ModalComponent>

            {/* Edit modal */}
            <ModalComponent
                ref={x => this.elModalEdit = x}
                buttons={<div>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={this.onClickArrangementEditorEdit__saveBtn}>Save</button>
                </div>}
                title={`Edit arrangement: ${this.state.modelForEdit.caption}`}
                onHide={() => {
                    if (this.arrangementEditorEdit) {
                        this.setState({ modelForEdit: {} });
                    }
                }}>
                <ArrangementEditor ref={x => this.arrangementEditorEdit = x} data={this.state.modelForEdit} />
            </ModalComponent>

            {/* Delete modal */}
            <ModalComponent
                ref={x => this.elModalDelete = x}
                buttons={<div>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger" onClick={this.onClickArrangementEditorDelete__saveBtn}>Delete</button>
                </div>}
                title={`Delete arrangement: ${this.state.modelForEdit.caption}`}>
                <p>Do you really want to delete this arrangement?</p>
            </ModalComponent>

            <PagingBar
                ref={x => this.pagingBar = x}
                totalResults={this.props.arrangements.length}
                limitPerPage={this.state.limitPerPage}
                currentPage={this.state.pageNum}
                onChangePage={this.onChangePage}
            />
        </div>;
    }
}

var component = connect(
    state => state.arrangement, // Selects which state properties are merged into the component's props.
    ArrangementStore.actionCreators // Selects which action creators are merged into the component's props.
)(ArrangementPage);

export default (withRouter(component));

//class ArrangementPage extends React.Component {
//    render() {

//        return <div>
//            <h1>Hello! </h1>

//        </div>
//    }

//}