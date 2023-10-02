<template>
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #1F1F1F;">
        <a class="navbar-brand" id="weyellow" href="/"><img src="../assets/Weyellow.png" alt="WePlay Yellow" width="153"
                height="153"></a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav">
                <li class="nav-item"><a class="nav-link" href="/squads">Squads</a></li>
                <li class="nav-item"><a class="nav-link" href="/clans">Clans</a></li>
                <li class="nav-item"><a class="nav-link" href="/games">Games</a></li>
                <li class="nav-item"><a class="nav-link" href="/friends">Friends</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'TopBar'
}
</script>

<style>
.navbar {
    height: 130px;
}

.nav-link {
    text-decoration: none;
    color: #9EB3C2;
    text-align: left;
    font-family: 'Martian Mono';
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
}

.navbar-nav {
    gap: 40px;
}
</style>