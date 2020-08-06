import { GLibExecutor } from "./executor";
import { log } from "./log";

//@ts-ignore
const Me = imports.misc.extensionUtils.getCurrentExtension();

const { Gio, GLib } = Me.imports.gi;

import * as Log from 'log'

const CONF_DIR: string = GLib.get_home_dir() + "/.config/pop-shell"
const CONF_FILE: string = CONF_DIR + "/config.json"

export interface FloatRule {
    class?: string;
    title?: string;
}

export class Config {
    float: Array<FloatRule> = [
        { class: "Conky", },
        { class: "Com.github.donadigo.eddy", },
        { class: "Gnome-screenshot", },
        { class: "Authy Desktop", },
        { class: "jetbrains-toolbox", },
        { class: "Steam", title: "!Steam" },
        { class: "TelegramDesktop", title: "Media viewer" },
        { class: "KotatogramDesktop", title: "Media viewer" }
    ]

    to_json(): string {
        return JSON.stringify(this);
    }

    static from_json(json: string) {
        return Object.assign(new Config(), json);
    }

    static from_config(): null | this {

    }

    open_file(): null | any {
        const conf = Gio.File.new_for_path(CONF_FILE);
        if (!conf.query_exists(null)) {
            const dir = Gio.File.new_for_path(CONF_DIR);
            if (!dir.query_exists(null)) {
                if (!dir.make_directory()) {
                    Log.error('failed to make config directory');
                    return null;
                }
            }
        }
    }

    sync_to_disk() {

    }
}
