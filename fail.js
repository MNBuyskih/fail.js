"use strict";

function fail(errorCb, successCb, context) {
    return function () {
        var args = Array.prototype.slice.call(arguments),
            isError = !!args[0];

        ((isError ? errorCb : successCb) || fail.noop).apply(context || null, isError ? args : args.splice(1));
    };
}

fail.noop = function () {
    return arguments;
};

module.exports = fail;