import ServiceBase from "@Services/ServiceBase";

export default class ArrangementService extends ServiceBase {
    static async search(term) {
        if (term == null) {
            term = "";
        }
        var result = await this.requestJson({
            url: `/api/Arrangement/Search?term=${term}`,
            method: "GET"
        });
        return result;
    }
    static async update(model) {
        var result = await this.requestJson({
            url: `/api/Arrangement/${model.id}`,
            method: "PATCH",
            data: model
        });
        return result;
    }
    static async delete(id) {
        var result = await this.requestJson({
            url: `/api/Arrangement/${id}`,
            method: "DELETE"
        });
        return result;
    }
    static async add(model) {
        var result = await this.requestJson({
            url: "/api/Arrangement/Add",
            method: "POST",
            data: model
        });
        return result;
    }
}