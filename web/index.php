<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Waveline - только интересные новости!</title>
    <link type="text/css" rel="stylesheet" href="res/style.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300i,400,700,700i&amp;subset=cyrillic"
          rel="stylesheet">
    <link rel="shortcut icon" href="res/favicon.ico" type="image/x-icon">
    <link rel="icon" href="res/favicon.ico" type="image/x-icon">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://unpkg.com/react@16.4.1/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16.4.1/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>

</head>
<body id="ReactPage">
<header>

    <input type="text" placeholder="Поиск">
    <nav>
        <a href="archive.html">#Архив</a>
    </nav>
    <nav>
        <a href="landing-project.html">#Россия_Столетие_Перемен</a>
    </nav>
    <nav>
        <a href="archive.html">#О_нас</a>
    </nav>

    <nav>
        <a href="add.html">Предложить!</a>
    </nav>
</header>

<div class="LifePlayer">

</div>


<div class="NewsList">

</div>

<div class="HotAction">
    <h1>#Это_Интересно</h1>
    <a href="https://www.youtube.com/watch?v=HbPx3rhGK90" target="_blank">Как создать лонгрид?</a>
    <a href="http://ru.freepik.com/" target="_blank">Свободные графические<br/> материалы</a>
    <a href="http://colorhunt.co/" target="_blank">Подбор цветовых палитр</a>
    <a href="http://online.orfo.ru/" target="_blank">Проверка правописания</a>
    <a href="https://www.youtube.com/watch?v=9x_vIeNx5JM" target="_blank">Лекция Владимира Познера<br/> о журналистике</a>
    <a href="https://www.youtube.com/watch?v=vEv47JknBqE&list=PL94-yBq_Il_xIn_-P2bpFzNzMnTkfL6Ep" target="_blank">Интернет-журналистика <br/> от Mail.Ru Group</a>
    <a href="http://ynpress.com/" target="_blank">Молодежное информационное <br/> пространство "ЮНПРЕСС"</a>
    <a href="https://vc.ru/p/40-services" target="_blank">40 полезных сервисов</a>
    <a href="https://infogra.ru/infographics/14-servisov-dlya-sozdaniya-infografiki" target="_blank">Коллекция сервисов<br/> для создания инфографики</a>
</div>


<div class="NavigationBar"></div>

<audio style="display: none"></audio>
</body>
<script src="res/js/AdditionalScript.js"></script>
<script src="res/js/ReactComponents.js" type="text/babel"></script>
<script type="text/babel">ReactDOM.render(<Player />, document.getElementsByClassName('LifePlayer')[0])</script>
<script type="text/babel">ReactDOM.render(<Menu />, document.getElementsByClassName('NavigationBar')[0])</script>
<script type="text/babel">ReactDOM.render(<MainElements />, document.getElementsByClassName('NewsList')[0])</script>

</html>