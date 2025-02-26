"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const report_service_1 = require("./report.service");
const create_report_dto_1 = require("./dtos/create-report.dto");
const auth_guard_1 = require("../user/guards/auth.guard");
const current_user_decorator_1 = require("../user/decorators/current-user.decorator");
const user_entity_1 = require("../user/user.entity");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const report_details_dto_1 = require("./dtos/report-details.dto");
const get_estimate_dto_1 = require("./dtos/get-estimate.dto");
const admin_guard_1 = require("../user/guards/admin.guard");
let ReportController = class ReportController {
    reportService;
    constructor(reportService) {
        this.reportService = reportService;
    }
    getEstimate(query) {
        return this.reportService.getEstimate(query);
    }
    createReport(body, user) {
        return this.reportService.create(body, user);
    }
    approveReport(id) {
        return this.reportService.approveReport(+id);
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_estimate_dto_1.GetEstimateDto]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "getEstimate", null);
__decorate([
    (0, common_1.Post)(),
    (0, serialize_interceptor_1.Serialize)(report_details_dto_1.ReportDetailsDto),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_report_dto_1.CreateReportDto, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "createReport", null);
__decorate([
    (0, common_1.Patch)('/:id/approve'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReportController.prototype, "approveReport", null);
exports.ReportController = ReportController = __decorate([
    (0, common_1.Controller)('report'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
//# sourceMappingURL=report.controller.js.map