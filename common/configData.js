import Util from "./util.js";

class ConfigData {
    static config = Util.parseJson('common/config.json');
}

export default ConfigData;