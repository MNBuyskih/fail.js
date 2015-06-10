"use strict";

function fail(errorCb, successCb, context) {
    if (arguments.length === 1) {
        successCb = errorCb;
        errorCb = fail.error;
    }

    return function () {
        var args = Array.prototype.slice.call(arguments),
            isError = !!args[0];

        ((isError ? errorCb : successCb) || fail.noop).apply(context || null, isError ? args : args.splice(1));
    };
}

fail.noop = function () {
    return arguments;
};

fail.success = function (successCb) {
    return fail(fail.noop, successCb);
};

fail.error = function (error) {
    console.error(error);
};

fail.express = function (status, behavior) {
    if (!status) {
        status = 400;
    }

    if (!behavior) {
        behavior = function (response) {
            return function (error) {
                console.error(error);
                response.status(400).end(error.toString());
            };
        };
    }

    return function (request, response, next) {
        fail.error = behavior(response);
        next();
    };
};

module.exports = fail;