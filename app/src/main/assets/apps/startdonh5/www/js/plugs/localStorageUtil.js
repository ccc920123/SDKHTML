/**
 *本地数据保存工具
 **/

(function ($, owner) {

    /**
     *  保存数据
     * @param key  你的key
     * @param value  你需要保存的值
     */
    owner.setLocalData = function (key, value) {
        value = value || {};
        localStorage.setItem('$' + key, JSON.stringify(value));
    }
    /**
     * 根据key 得到 存放的数据
     * @param key
     */
    owner.getLocalData = function (key) {
        var settingsText = localStorage.getItem('$' + key) || "{}";
        return JSON.parse(settingsText);
    }
}(mui, window.sava = {}));