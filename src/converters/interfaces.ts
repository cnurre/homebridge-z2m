import { Logger, Controller, Service } from 'homebridge';
import { ExposesEntry } from '../z2mModels';
import { BasicLogger } from '../logger';

export interface BasicAccessory {
    log: BasicLogger;

    platform: BasicPlatform;

    readonly displayName: string;

    configureController(controller: Controller): void;

    getDefaultServiceDisplayName(subType: string | undefined): string;

    getOrAddService(service: Service): Service;

    queueDataForSetAction(data: Record<string, unknown>): void;

    queueKeyForGetAction(key: string | string[]): void;

    isPropertyExcluded(property: string | undefined): boolean;

    isValueAllowedForProperty(property: string, value: string): boolean;

    registerServiceHandler(handler: ServiceHandler): void;

    isServiceHandlerIdKnown(identifier: string): boolean;

    isExperimentalFeatureEnabled(feature: string): boolean;

    getConverterConfiguration(tag: string): unknown | undefined;

    isAdaptiveLightingEnabled(): boolean;

    getAdaptiveLightingMinimumColorTemperatureChange(): number;

    getAdaptiveLightingTransitionTime(): number;
}

export interface BasicPlatform {
    isHomebridgeServerVersionGreaterOrEqualTo(version: string): boolean;
}

export interface ServiceHandler {
    identifier: string;
    getableKeys: string[];
    updateState(state: Record<string, unknown>): void;
}

export interface ConverterConfigurationRegistry {
    registerConverterConfiguration(tag: string, validator: (config: unknown, tag: string, logger: Logger | undefined) => boolean): void;
}

export interface ServiceCreator {
    createServicesFromExposes(accessory: BasicAccessory, exposes: ExposesEntry[]): void;
}