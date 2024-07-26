export interface Addon {
    id: string;
    destroy: () => void;
}

/**
 * 可挂载类
 */
export class Mountable {
    private _addons: any[] = [];

    addAddon(addon: any) {
        this._addons.push(addon);
        return addon;
    }

    /**
     *
     * @param {string} hook
     * @param {any} arg
     */
    notifyAddons(hook: string, arg: any) {
        this._addons.forEach((addon) => {
            addon[hook] && addon[hook](arg);
        });
    }

    removeAddon(addon: Addon) {
        this._addons = this._addons.filter((_addon) => _addon !== addon);
        addon.destroy();
    }

    /**
     * 宿主destroy的时候调用
     */
    clearAddons() {
        this._addons.forEach((addon) => {
            addon.destroy();
        });
        this._addons = [];
    }

    getAddonByClass(clazz: any) {
        return this._addons.filter((addon) => {
            return addon instanceof clazz;
        });
    }

    getAddonById(id: string) {
        return this._addons.find((addon) => addon.id === id);
    }
}
