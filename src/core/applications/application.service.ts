import { CryptoService } from "utils/crypto.service";
import { ApiKey, Application, IApplicationModel } from "./applications.model";
import { NotFoundError } from "shared/customErros";

export class ApplicationsService {
  registerApplication = async (
    data: IApplicationModel
  ): Promise<{ apiKey: string }> => {
    const { name, url, description, redirectUrl, domain, ip } = data;

    const application = await Application.create({
      name,
      url,
      description,
      domain,
      redirectUrl,
      ip,
    });

    const apiKey = this.generateApiKey(application.id);

    await this.saveApiKey(application.id, apiKey);

    return { apiKey };
  };

  getApplicationApiKey = async (appId: string): Promise<string> => {
    const application = await this.findApplicationById(appId);
    const apiKey = await ApiKey.findOne({
      where: {
        applicationId: application.id,
        isActive: true,
      },
    });
    if (!apiKey)
      throw new NotFoundError(`Api key for application ${appId} not found`);

    return apiKey.key;
  };

  generateApplicationApiKey = async (appId: string): Promise<string> => {
    const application = await this.findApplicationById(appId);
    const apiKey = this.generateApiKey(application.id);
    await this.saveApiKey(appId, apiKey);
    return apiKey;
  };

  findApplicationById = async (appId: string): Promise<Application> => {
    const application = await Application.findByPk(appId);
    if (!application) {
      throw new NotFoundError(`Application with id ${appId} not found`);
    }
    return application;
  };

  saveApiKey = async (applicationId: string, apiKey: string): Promise<void> => {
    await ApiKey.create({
      applicationId,
      key: apiKey,
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });
    await ApiKey.update(
      { isActive: false },
      {
        where: {
          applicationId,
          key: {
            $ne: apiKey,
          },
        },
      }
    );
  };

  generateApiKey = (appId: string): string => {
    return CryptoService.createHash(appId);
  };
}

export const applicationsService = new ApplicationsService();
