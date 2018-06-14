/*SuperGlobal Var*/
var initData = {};



var Component = React.createReactClass({
  mixins: [MixinA],
  render() {
    return <Child />;
}
});

// After (15.5)
var React = require('react');
var createReactClass = require('create-react-class');

var Component = createReactClass({
  mixins: [MixinA],
  render() {
    return <Child />;
}



///////////////////////////////////Additional Script//////////////////////////////////////////
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
//////////////////////////////////////////////////////////////////////////////////////////////
function Clock() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    (hours < 10) ? hours = "0" + hours : hours;
    (minutes < 10) ? minutes = "0" + minutes : minutes;
    (seconds < 10) ? seconds = "0" + seconds : seconds;
    (day < 10) ? day = "0" + day : day;
    (month < 10) ? month = "0" + month : month;

    document.getElementById("clock_place").innerHTML = day + "-" + month + "-" + year + "<br>" + hours + ":" + minutes + ":" + seconds;
}
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////IndexForm/////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
var Player = React.createReactClass({
    getInitialState: function () {
        return ({
            btn: 0,
            playlist: ["http://hanx.byethost3.com/media/audio/eshche-est-nadejda.mp3"],
            audioPlayer: []
        })
    },
    componentWillMount: function () {
        var audio = document.getElementsByTagName('audio')[0];
        audio.src = this.state.playlist[0];
        setInterval(Clock, 1000);
    },
    indexURL: function () {
        location.href = 'index.html';
    },
    play: function () {
        var audio = document.getElementsByTagName('audio')[0];
        if (this.state.btn == 0) {
            this.setState({btn: 1});
            try {
                audio.play();
            } catch (err) {
                console.log(err);
            }
        } else {
            this.setState({btn: 0});
            try {
                audio.pause();
            } catch (err) {
                console.log(err);
            }
        }
    },
    render: function () {
        var symbol = this.state.btn ? "||" : "▶";
        return (<div>
            <nav onClick={this.indexURL}><p>Wave</p>line</nav>
            <label><input type="button" className="PlayPauseButton" onClick={this.play} value={symbol}/>Выпуск #1:
            Еще есть надежда (Денис Насруллин).<h2 id="clock_place"> 00-00-0000<br/>00:00:00 </h2> <h1>Сейчас: </h1>
            </label>
            </div>);
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////
var LikeBox = React.createReactClass({
    getInitialState: function () {
        return ({toggleLike: 0, liked: 0});
    },
    like: function () {
        if (this.state.toggleLike == 0) {
            this.setState({toggleLike: 1});

            if (this.state.liked != 1) {
                $.get({
                    url: "res/php/incViews.php?like&id=" + this.props.id,
                    dataType: "text",
                    success: function (data) {
                        this.setState({liked: 1});
                    }.bind(this)
                });
            }
        } else {
            this.setState({toggleLike: 0});
        }
    },
    render: function () {
        var style = (this.state.toggleLike == 0) ? "like-box unliked" : "like-box liked";
        var count = (this.state.toggleLike == 0) ? this.props.likes : (this.props.likes + 1);

        return (<div onClick={this.like} className={style}>{count}</div>);
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////
var ViewBox = React.createReactClass({
    render: function () {
        return (<div className="ViewBox">{this.props.views}</div>);
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////
var ReadMoreBox = React.createReactClass({
    render: function () {
        return (<a className="ReadMore" href={this.props.url}>Подробнее</a>);
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////
var MainElements = React.createReactClass({
    loadCommentsFromServer: function () {
        $.post({
            url: "/res/php/dbinteract.php?main=1",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }, // new
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
    },
    render: function () {

        var dataOf = this.state.data; //Данные с сервера

        if (0 != dataOf.length) { //Проверка на ответ с сервера


            var arrDate = []; //Массив для React'a

            arrDate.push((() => {
                return (<h1 key={0} className="NewsHeader">Главные новости</h1>)
            })());
            dataOf.forEach((el, i) => {
                arrDate.push((()=> {
                    var urls = "post.html?id=" + el.id;

                    var today = new Date().toISOString();

                    today = today.substring(0, 4) + today.substring(5, 7) + today.substring(8, 10);

                    var tempData = el.date.substring(0, 4) + el.date.substring(5, 7) + el.date.substring(8, 10);


                    if (today !== tempData) {
                        tempData = el.date.substring(0, 10);
                    } else {
                        tempData = el.date.substring(11, 16)
                    }

                    return (
                    <div key={"md-"+i} className="content-layer">
                    <time >{tempData}</time>
                    <h1>{el.title}</h1>
                    <hr />
                    <img src={el.mainimg}/>
                    <p>{el.desc}</p>
                    <div className="InfoBox">
                    <LikeBox id={el.id} likes={el.like}/>
                    <ViewBox views={el.views}/>
                    </div>
                    <ReadMoreBox url={urls}/>
                    </div>
                    );
                })())
            });

        }
        return (<div>{arrDate}</div>);
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////
var Menu = React.createReactClass({
    getInitialState: function () {
        return ({toggle: "start", styleM: {}, styleL: {}})
    },
    doAnimation: function () {
        if (this.state.toggle == 0) {
            this.setState({toggle: 1});
        } else {
            //console.log(this.state.toggle);
            this.setState({toggle: 0});
        }

        this.setState({
            styleM: {
                animationName: ((this.state.toggle == 0) ? 'MenuOff' : 'MenuOn'),
                animationTimingFunction: 'ease-in-out',
                animationDuration: '1s',
                animationDirection: 'normal',
                animationFillMode: 'forwards',
                overflow: 'hidden'
            }
        });

        this.setState({
            styleL: {
                animationName: ((this.state.toggle == 0) ? 'MiniLogoOff' : 'MiniLogoOn'),
                animationTimingFunction: 'ease-in-out',
                animationDuration: '1s',
                animationDirection: 'normal',
                animationFillMode: 'forwards'
            }
        });

    },
    render: function () {
        if (this.state.toggle == "start") {
            return (
                <div className="NavigationMenu" onClick={this.doAnimation}>
                <div className="MiniLogo" onClick={this.doAnimation}></div>
                <div className="link">
                <a href="index.html">Waveline</a>
                <a href="landing-project.html">Россия: 100-летие перемен</a>
                <a href="about.html">О нас</a>
                <a href="">Гайд по оформлению</a>
                <a href="http://vk.com">Группа ВК</a>
                <a href="maitto:hacks2013@yandex.ru">Поддержка</a>
                <a href="add.html">Предложить материал</a>
                </div>
                </div>
                );
        } else {
            return (
                <div className="NavigationMenu" style={this.state.styleM} onClick={this.doAnimation}>
                <div className="MiniLogo" style={this.state.styleL} onClick={this.doAnimation}></div>
                <div className="link">
                <a href="index.html">Waveline</a>
                <a href="landing-project.html">Россия: 100-летие перемен</a>
                <a href="about.html">О нас</a>
                <a href="">Гайд по оформлению</a>
                <a href="http://vk.com">Группа ВК</a>
                <a href="maitto:hacks2013@yandex.ru">Поддержка</a>
                <a href="add.html">Предложить материал</a>
                </div>
                </div>
                );

        }
    }


});


//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////Posts/////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
var Articles = React.createReactClass({

    loadCommentsFromServer: function () {

        if (typeof this.props.initData.author === "undefined") {
            $.get({
                url: ("res/php/dbinteract.php" + "?id=" + getUrlVars()['id']),
                dataType: "json",
                success: function (data) {
                    this.setState({data: data});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        } else {
            this.setState({data: this.props.initData});
        }
    }, // new
    getInitialState: function () {
        return {data: ["Загрузка"]};
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        this.views();
    },
    views: function () {
        $.get({
            url: ("res/php/incViews.php" + "?id=" + getUrlVars()['id'])
        });
    },
    render: function () {
        var dataFrom;
        if (typeof this.props.initData.author === "undefined") {
            console.log(this.state.data);
            dataFrom = this.state.data[0];
        } else {
            console.log(this.state.data);
            dataFrom = this.state.data
        }

        const defaultState = "Загрузка";
        if (dataFrom != defaultState) {
            if (typeof (dataFrom) == "undefined") {
                return (<h1>Произошла ошибка, попробуйте позже :)</h1>)
            } else {
                console.log(dataFrom);
                const BackStyle = {backgroundImage: 'url(' + dataFrom.mainimg + ')'};

                const nonestyle = {display: "none"};

                return (
                <article>
                <header style={BackStyle}>
                <div className="substrate"></div>
                <a className="backa" href="index.html">На главную</a>

                <h1>{dataFrom.title}</h1>
                <span style={(dataFrom.lead=='')? nonestyle:{}}>{dataFrom.lead}</span>
                <div className="InfoBox">
                <LikeBox id={dataFrom.id} likes={dataFrom.like}/>
                <ViewBox views={dataFrom.views}/>
                </div>
                <label>
                <b>Автор: </b>{dataFrom.author}<br/>
                <b>Опубликовано: </b>
                <data value={dataFrom.date}>{dataFrom.date}</data>
                </label>
                </header>

                <MainTextPlace text={dataFrom.text}/>

                </article>
                );
            }
        } else {
            return (<h1>Подождите, пожалуйста, идет загрузка!</h1>);
        }


    }


});
//////////////////////////////////////////////////////////////////////////////////////////////
var MainTextPlace = React.createReactClass({
    render: function () {
        return (<div className="MainTextPlace"><div dangerouslySetInnerHTML={{__html: this.props.text}}></div></div>)
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////LoginForm/////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
var ConfirmRejectBtn = React.createReactClass({
    confirmPost: function () {
        if (confirm("Вы действительно желаете опубликовать данный материал?")) {
            $.get(
                "res/php/dbConfirmRejectScript.php",
                {confirm: this.props.id},
                () => {
                    alert("Материал успешно опубликован!");
                }
                );
        }
    },
    RejectPost: function () {
        if (confirm("Вы действительно желаете удалить данный материал?")) {
            $.get(
                "res/php/dbConfirmRejectScript.php",
                {reject: this.props.id},
                () => {
                    alert("Материал успешно удален!");
                }
                );
        }
    },
    render: function () {
        return (
            <td>
            <input type="button" onClick={this.confirmPost} value="Подтвердить"/>
            <input type="button" onClick={this.RejectPost} value="Отклонить"/>
            </td>);
        }
    });
//////////////////////////////////////////////////////////////////////////////////////////////
var AfterPlace = React.createReactClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        $.post({
            url: "/res/php/dbinteract.php",
            dataType: "json",
            success: function (data) {
                console.log(data);
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        if (this.state.data != "undefined") {
            var dataOf = this.state.data;

            //console.log(dataOf);

            var bigArr = [];

            bigArr.push(
                <tr key={"2-h"}>
                <td>ID</td>
                <td>Заголовок</td>
                <td>Дата</td>
                <td>Автор</td>
                <td>Описание</td>
                <td>Превью</td>
                <td>Опубликовать</td>
                </tr>
                );

            dataOf = dataOf.forEach(
                (el, i) => {
                    var arrDate = [];
                    Object.keys(el).map(
                    x => arrDate.push(
                    function () {
                    if (x == 'id') {
                    return (
                    <td key={"1-"+x}><a target="_blank"
                    href={"post.html?id="+el[x]}>{"URL: " + el[x]}</a></td>)
                    }
                    if (x == 'mainimg') {
                    return (
                    <td key={"1-"+x}><a href={el[x]}>{el[x]}</a></td>)
                    }
                    return (<td key={"1-"+x}>{el[x]}</td>)
                    }()
                    )
                    );


                    arrDate.push(<ConfirmRejectBtn key={"1-c"+el['id']} id={el['id']}/>);

                    bigArr.push(function () {
                    return (<tr key={"2-"+i}>{arrDate}</tr>)
                    }()
                    );
                    arrDate = [];
                    }
                    );


                    return (<table>
                    <caption>Предлагаемые материалы</caption>
                    <tbody>{bigArr}</tbody>
                    </table>);
                    }
                    }
                    });
                    //////////////////////////////////////////////////////////////////////////////////////////////
                    var LoginForm = React.createReactClass({
                    getLogin: function () {
                    let serial = $('.autorizationform').serializeArray();
                    $.post({
                    url: "res/php/loginOnSession.php",
                    data: {login: serial[0].value, password: serial[1].value},
                    dataType: "json",
                    success: function (data) {
                    this.setState({data: data});
                    }.bind(this),
                    error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                    }.bind(this)
                    });
                    },
                    getInitialState: function () {
                    return {data: []};
                    },
                    componentDidMount: function () {
                    $.post({
                    url: "res/php/isLogin.php",
                    dataType: "text",
                    success: function (data) {
                    this.setState({data: data});
                    }.bind(this),
                    error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                    }.bind(this)
                    });
                    },
                    onKeyEnter: function (e) {
                    if (e.key === 'Enter') {
                    this.getLogin();
                    }
                    },
                    render: function () {
                    var dataOf = this.state.data;

                    console.log(dataOf);

                    if (dataOf.length == 0) {
                    return (<h1></h1>);
                    }

                    if (dataOf != "undefined") {
                    console.log(dataOf);

                    if (typeof (dataOf.Answer) !== "undefined") {
                    alert(dataOf.Answer);
                    return (<form className="autorizationform" onKeyPress={this.onKeyEnter}>
                    <label>Логин:</label><br/><input type="text" name="login" placeholder="Username"/><br/>
                    <label>Пароль:</label><br/><input type="password" name="password" placeholder="************"/><br/>
                    <input type="button" id="getLogin" value="Вход" onClick={this.getLogin}/>
                    </form>);
                    } else {

                    if (dataOf == 0) {
                    return (<form className="autorizationform" onKeyPress={this.onKeyEnter}>
                    <label>Логин:</label><br/><input type="text" name="login" placeholder="Username"/><br/>
                    <label>Пароль:</label><br/><input type="password" name="password"
                    placeholder="************"/><br/>
                    <input type="button" id="getLogin" value="Вход" onClick={this.getLogin}/>
                    </form>);
                    } else {
                    return (<AfterPlace/>);
                    }
                    }
                    } else {
                    return (<h1>|</h1>);
                    }
                    }
                    });

                    //////////////////////////////////////////////////////////////////////////////////////////////
                    ////////////////////////////////////////////UploadForm////////////////////////////////////////
                    //////////////////////////////////////////////////////////////////////////////////////////////
                    var UploadBox = React.createReactClass({
                    getInitialState: function () {
                    return ({files: [], progress: 0});
                    },
                    sendFile: function () {
                    var files = $('input[type=file]')[0].files;
                    console.log(files.length);
                    if (files.length != 0) {
                    if (files[0].size < (1024 * 1024 * 8)) {

                    //==================================================================================//
                    console.log(files);

                    var data = new FormData();

                    $.each(files, (key, value) => {
                    data.append(key, value);
                    });

                    $.ajax({
                    url: 'res/php/fileUploader.php?files',
                    type: 'POST',
                    data: data,
                    cache: false,
                    dataType: 'json',
                    processData: false, // Don't process the files
                    contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                    xhr: function () {
                    var sliderbar = $('.sliderbar')[0];
                    var xhr = $.ajaxSettings.xhr();
                    xhr.upload.addEventListener('progress', function (evt) {
                    if (evt.lengthComputable) {
                    var percentComplete = Math.ceil(evt.loaded / evt.total * 100);
                    $('.sliderbar')[0].style.width = percentComplete + "%";
                    $('.sliderbar').text("Загружено: " + percentComplete + "%");
                    if (percentComplete == 100) {
                    $('.sliderbar').text("Загрузка завершена");
                    }
                    }
                    }, false);
                    return xhr;
                    },
                    success: function (data) {
                    console.log(data);
                    if (typeof data.error === "undefined") {
                    // Success so call function to process the form
                    if (typeof this.state === "undefined") {
                    this.setState({files: data.files});
                    } else {
                    var arrayvar = this.state.files.slice();
                    arrayvar.push(data.files);
                    this.setState({files: arrayvar})
                    }
                    }
                    else {
                    alert("Файл имеет неподдерживаемый формат.");
                    console.log('ERRORS: ' + data.error);
                    }
                    }.bind(this),
                    error: function (jqXHR, textStatus, errorThrown) {
                    // Handle errors here
                    alert("Произошла ошибка загрузки, попробуйте позже!");
                    console.log('ERRORS: ' + textStatus);
                    // STOP LOADING SPINNER
                    }
                    });


                    //==================================================================================//
                    } else {
                    alert("Файл не должен превышать размер 10Мб");
                    }
                    }
                    },
                    getName: function (e) {
                    var str = e.target.value;
                    var path;
                    if (str.lastIndexOf('\\')) {
                    path = str.lastIndexOf('\\') + 1;
                    }
                    else {
                    path = str.lastIndexOf('/') + 1;
                    }
                    var filename = str.slice(path);
                    var uploaded = document.getElementById("fileformlabel");
                    uploaded.innerHTML = filename;
                    },
                    render: function () {
                    if (typeof this.state.files != "undefined") {
                    var fileList = [];

                    this.state.files.forEach((el, i)=> {
                    fileList.push(
                    (()=> {
                    return (<li key={"li"+i}><a href={"http://"+el} target="_blank">Просмотреть </a>{"http://" + el}
                    </li>)
                    })()
                    )
                    });
                    }

                    return (
                    <div className="uploadBox">
                    <label>Медиафайлы для материала:</label><br/>

                    <div className="fileform">
                    <div id="fileformlabel"></div>
                    <div className="selectbutton">Обзор</div>
                    <input id="upload" className="UpSel" type="file" name="uploadfile" onChange={this.getName}/>
                    </div>
                    <div className="progress-bar">
                    <div className="sliderbar"></div>
                    </div>
                    <input type="button" value="Загрузить" onClick={this.sendFile}/>
                    <ol>Список загруженных файлов:<br/>
                    {fileList}
                    </ol>
                    </div>);
                    }
                    });
                    //////////////////////////////////////////////////////////////////////////////////////////////
                    var UploadComponent = React.createReactClass({
                    render: function () {
                    return (
                    <form className="dataBox">
                    <div className="leftBlock"><label>Заголовок:</label><br/><input type="text" name="title"
                    placeholder="Заголовок"/><br/>
                    <label>Главное изображение (превью):</label><br/><input type="text" name="mainimg"
                    placeholder="Ссылка на картинку"/><br/>
                    <label>Автор материала:</label><br/><input type="text" name="author"
                    placeholder="И.Ф. Автора (псевдоним)"/><br/>
                    <label>Описание:</label><br/><textarea name="desc"
                    placeholder="Описание, которое привлечет внимание читателя. Отображается на главной странице возле картинки. Описание может совпадать с лидом."/><br/>
                    <label>Лид:</label><br/><textarea name="lead"
                    placeholder="Интересное начало материала. Отображается в пунктирной рамке на странице материала. Лид может совпадать с описанием."/><br/>
                    <br/></div>
                    <div className="rightBlock"><label>Материал <a href="">(гайд по оформлению):</a></label><br/><textarea
                    name="text"
                    placeholder="Текст материала. Можно использовать оформление и компоненты. Помощь в оформлении по ссылке выше."/><br/>
                    <UploadBtn/>
                    </div>
                    </form>
                    );
                    }
                    });
                    //////////////////////////////////////////////////////////////////////////////////////////////
                    var UploadForm = React.createReactClass({
                    render: function () {
                    return (
                    <div className="MainBox"><h1>Предложить материал для публикации</h1><UploadBox/><UploadComponent/></div>);
                    }
                    });
                    //////////////////////////////////////////////////////////////////////////////////////////////
                    var UploadBtn = React.createReactClass({
                    getInitialState: function () {
                    return ({init: []})
                    },
                    reView: function () {

                    var reViewArray = $("form").serializeArray();

                    $.post({
                    url: ("res/php/addnews.php?preview"),
                    data: reViewArray,
                    dataType: "json",
                    success: function (data) {
                    this.setState({init: data});
                    }.bind(this),
                    error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                    }.bind(this)
                    });

                    initData = this.state.init;

                    $("iframe")[0].contentWindow.location.reload(true);
                    $("iframe").show();
                    $("#closeForm").show();
                    },
                    sendPost: function () {
                    if (confirm("Вы действительно желаете отправить данный материал?")) {
                    var reViewArray = $("form").serializeArray();

                    $.post({
                    url: ("res/php/addnews.php?sendPost"),
                    data: reViewArray,
                    dataType: "text",
                    success: function (data) {
                    alert(data);
                    }.bind(this),
                    error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                    }.bind(this)
                    });
                    }
                    },
                    closeForm: function () {
                    $("iframe").hide();
                    $("#closeForm").hide();
                    },
                    render: function () {

                    initData = this.state.init;

                    return (<div>
                    <input type="button" id="ReviewBtn" value="Предпросмотр" onClick={this.reView}/>
                    <input type="button" id="SendPBtn" onClick={this.sendPost} value="Отправить"/>
                    <input type="button" id="closeForm" onClick={this.closeForm} value="Закрыть"/>
                    <iframe src="post.html" className="reViewBox" onClick={this.reView}>

                    </iframe>
                    </div>);
                    }
                    });