import { ServiceMaster } from "app/main/masters/serviceMaster/serviceMaster.model";
import { TariffServiceClassificationRate } from "app/main/masters/tariff/model/tariffServiceClassificationRate.model";
import { ServiceClassificationMaster } from "../../../main/masters/service-classification-tax-mapping/models/serviceClassification.model";
import { ServiceServiceMaster } from "./serviceServiceMaster.model";

export class ServiceData {
    public ServiceMaster: ServiceMaster;
    public ServiceClassificationMaster: Array<ServiceClassificationMaster>;
    public ServiceClassificationMasterVM: Array<ServiceClassificationMaster>;
    public TariffServiceClassificationRate: Array<TariffServiceClassificationRate>;
    public TariffServiceClassificationRateVM: Array<TariffServiceClassificationRate>;

    public ServiceClassificationVM: Array<ServiceClassificationMaster>;
    public serviceServiceMaster: Array<ServiceServiceMaster>;
  

  
}