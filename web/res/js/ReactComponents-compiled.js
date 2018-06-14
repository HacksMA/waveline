/**
 * Created by Admin on 11.02.2017.
 */

var LikeBox = React.createClass({
    displayName: "LikeBox",

    render: function () {
        return React.createElement(
            "div",
            { className: "like-box" },
            this.props.likes
        );
    }
});
//////////////////////////////////////////////////////////////////////////////////
var ViewBox = React.createClass({
    displayName: "ViewBox",

    render: function () {
        return React.createElement(
            "div",
            { className: "ViewBox" },
            this.props.views
        );
    }
});
//////////////////////////////////////////////////////////////////////////////////
var ReadMoreBox = React.createClass({
    displayName: "ReadMoreBox",

    render: function () {
        return React.createElement(
            "a",
            { className: "ReadMore", href: this.props.url },
            "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435"
        );
    }
});
//////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
var SomeElements = React.createClass({
    displayName: "SomeElements",

    loadCommentsFromServer: function () {
        $.post({
            url: "/res/php/dbinteract.php",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }, // new
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
    },
    render: function () {

        var dataOf = this.state.data; //Данные с сервера

        if (0 != dataOf.length) {
            //Проверка на ответ с сервера


            var arrDate = []; //Массив для React'a

            arrDate.push(function () {
                return React.createElement(
                    "h1",
                    { key: 0, className: "NewsHeader" },
                    "\u0413\u043B\u0430\u0432\u043D\u044B\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438"
                );
            }());

            for (var i in dataOf) {
                //Перебор объекта, превращение его в массив объектов React
                arrDate.push( //После этой конструкции создается ощущение, что отсосал сам себе
                function () {
                    //А после этой...хз...мы такое еще не проходили.

                    console.log(dataOf);

                    var urls = "post.html?id=" + dataOf[i].id;

                    return React.createElement(
                        "div",
                        { key: "md-" + i, className: "content-layer" },
                        React.createElement(
                            "time",
                            null,
                            dataOf[i].date.substring(11, 16)
                        ),
                        React.createElement(
                            "h1",
                            null,
                            dataOf[i].title
                        ),
                        React.createElement("hr", null),
                        React.createElement("img", { src: dataOf[i].mainimg }),
                        React.createElement(
                            "p",
                            null,
                            dataOf[i].desc
                        ),
                        React.createElement(
                            "div",
                            { className: "InfoBox" },
                            React.createElement(LikeBox, { likes: dataOf[i].like }),
                            React.createElement(ViewBox, { views: dataOf[i].views })
                        ),
                        React.createElement(ReadMoreBox, { url: urls })
                    );
                }());
            }
        }
        return React.createElement(
            "div",
            null,
            arrDate
        );
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////Additional Script//////////////////////////////////////////
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
//////////////////////////////////////////////////////////////////////////////////////////////
var MainTextPlace = React.createClass({
    displayName: "MainTextPlace",

    render: function () {
        return React.createElement(
            "div",
            { className: "MainTextPlace" },
            React.createElement(
                "p",
                null,
                this.props.text
            )
        );
    }
});
//////////////////////////////////////////POSTS///////////////////////////////////////////////
var Articles = React.createClass({
    displayName: "Articles",


    loadCommentsFromServer: function () {
        $.get({
            url: "/res/php/dbinteract.php" + "?id=" + getUrlVars()['id'],
            dataType: "json",
            success: function (data) {
                console.log(data);
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }, // new
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
    },
    render: function () {
        var dataFrom = this.state.data[0];
        console.log(dataFrom);
        if (typeof dataFrom != "undefined") {

            const BackStyle = { backgroundImage: 'url(' + dataFrom.mainimg + ')' };

            return React.createElement(
                "article",
                null,
                React.createElement(
                    "header",
                    { style: BackStyle },
                    React.createElement("div", { className: "substrate" }),
                    React.createElement(
                        "a",
                        { className: "backa", href: "index.html" },
                        "\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E"
                    ),
                    React.createElement(
                        "h1",
                        null,
                        dataFrom.title
                    ),
                    React.createElement(
                        "span",
                        null,
                        dataFrom.lead
                    ),
                    React.createElement(
                        "div",
                        { className: "InfoBox" },
                        React.createElement(LikeBox, { likes: dataFrom.like }),
                        React.createElement(ViewBox, { views: dataFrom.views })
                    ),
                    React.createElement(
                        "label",
                        null,
                        React.createElement(
                            "b",
                            null,
                            "\u0410\u0432\u0442\u043E\u0440: "
                        ),
                        dataFrom.author,
                        React.createElement("br", null),
                        React.createElement(
                            "b",
                            null,
                            "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043E: "
                        ),
                        React.createElement(
                            "data",
                            { value: dataFrom.date },
                            dataFrom.date
                        )
                    )
                ),
                React.createElement(MainTextPlace, { text: dataFrom.text })
            );
        } else {
            return React.createElement(
                "h1",
                null,
                "\u041F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430."
            );
        }
    }

});

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////LoginForm/////////////////////////////////////////
var LoginForm = React.createClass({
    displayName: "LoginForm",

    getLogin: function () {
        let serial = $('.autorizationform').serializeArray();
        $.post({
            url: "loginOnSession.php",
            data: { login: serial[0].value, password: serial[1].value },
            dataType: "json",
            success: function (data) {
                console.log(data);
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        // this.loadCommentsFromServer();
    },
    render: function () {

        var dataOf = this.state.data; //Данные с сервера

        console.log(this.state.data);

        if (0 != 0) {
            //Проверка на ответ с сервера


            var arrDate = []; //Массив для React'a

            arrDate.push(function () {
                return React.createElement(
                    "h1",
                    { className: "NewsHeader" },
                    "\u0413\u043B\u0430\u0432\u043D\u044B\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438"
                );
            }());

            for (var i in dataOf) {
                //Перебор объекта, превращение его в массив объектов React
                arrDate.push( //После этой конструкции создается ощущение, что отсосал сам себе
                function () {
                    //А после этой...хз...мы такое еще не проходили.

                    console.log(dataOf);

                    var urls = "post.html?id=" + dataOf[i].id;

                    return React.createElement(
                        "div",
                        { className: "content-layer" },
                        React.createElement(
                            "time",
                            null,
                            dataOf[i].date.substring(11, 16)
                        ),
                        React.createElement(
                            "h1",
                            null,
                            dataOf[i].title
                        ),
                        React.createElement("hr", null),
                        React.createElement(
                            "p",
                            null,
                            dataOf[i].desc
                        ),
                        React.createElement(
                            "div",
                            { className: "InfoBox" },
                            React.createElement(LikeBox, { likes: dataOf[i].like }),
                            React.createElement(ViewBox, { views: dataOf[i].views })
                        ),
                        React.createElement(ReadMoreBox, { url: urls })
                    );
                }());
            }
            return React.createElement(
                "div",
                null,
                arrDate
            );
        } else {
            return React.createElement(
                "form",
                { className: "autorizationform" },
                React.createElement(
                    "label",
                    null,
                    "\u041B\u043E\u0433\u0438\u043D:"
                ),
                React.createElement("br", null),
                React.createElement("input", { type: "text", name: "login", placeholder: "\u041B\u043E\u0433\u0438\u043D" }),
                React.createElement("br", null),
                React.createElement(
                    "label",
                    null,
                    "\u041F\u0430\u0440\u043E\u043B\u044C:"
                ),
                React.createElement("br", null),
                React.createElement("input", { type: "text", name: "password", placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C" }),
                React.createElement("br", null),
                React.createElement("input", { type: "button", id: "getLogin", value: "\u0412\u0445\u043E\u0434", onClick: this.getLogin })
            );
        }
    }
});

//# sourceMappingURL=ReactComponents-compiled.js.map