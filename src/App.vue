<template>
  <div id="app">
    <router-view/>
    <footer>
        &copy; Тестовое задание 2020
    </footer>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

html {
  background: #EBEBEB;
}

h1, h2, h3, h4, h5, h6, p {
  margin: 0;
}

ul {
  padding: 0;
  margin: 0;
}

a, a:visited {
  color: #1F8C8D;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  padding: 1rem 2rem;

  min-height: 92.5vh;

  button {
    background-color: #1F8C8D;
    box-shadow: none;
    border: none;
    outline: none;
    color: white;
    padding: .625rem 1.5rem;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1.25rem;
  }

  main {
      margin-top: 5rem;
      ul {
          list-style: none;

          li {
              display: flex;
              align-items: center;
          }
      }
  }

  footer {
    position: relative;
    text-align: center;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);

    color: #AFAFAF;
    font-weight: bold;
  }
}
</style>
