![nowsta](https://s3.amazonaws.com/nowsta-assets/A1.png)

# Hi there! :wave:

Thanks for your interest in Nowsta :-) we really appreciate you taking the time
to work on this coding challenge for us. We expect it to take no longer than a
few hours, although you should feel free to work on it as much as you'd like.

## The task

Our task for you is to implement
[Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
using React.

The deliverable is your fork of this repository (no need to create a PR), or zip
up your solution and send it via email. Here are the basic requirements:

- Display a grid UI in the DOM with "on" and "off" states for each cell
- Have a button that advances the model to the next generation by a single step
  manually

Here are some other ideas (presented in no particular order) if you are feeling
up for the challenge:

_(Note that we value quality over quantity, so doing these are not necessary.
They're just provided as suggestions if you're having fun and would like to add
more functionality.)_

- Add a button to advance through the generations automatically
- Add a slider that allows the user to time-travel and scrub through any
  historical of generations that the model went through
- Add an option for
  [wrap-around](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#/media/File:%D0%98%D0%B3%D1%80%D0%B0_%22%D0%96%D0%B8%D0%B7%D0%BD%D1%8C%22.gif)
- Add a preset selector that allows the user to initialize the board to
  [certain cool configurations](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns)
- Add a mode that allows the user to create their own initial board state

As the second part of the interview, we will probably work on one or two of the
above in person together.

![pulsar](https://upload.wikimedia.org/wikipedia/commons/0/07/Game_of_life_pulsar.gif)
![breeder](https://upload.wikimedia.org/wikipedia/commons/e/e6/Conways_game_of_life_breeder_animation.gif)
![i-column](https://upload.wikimedia.org/wikipedia/commons/f/fb/I-Column.gif)

(P.S. the class of cellular automata models are pretty fascinating and some
[have even been observed in nature](https://en.wikipedia.org/wiki/Cellular_automaton#/media/File:Textile_cone.JPG).)

## Objectives

- You may use git! Please commit often so it's easy to follow your train of
  thought and iterations
- Write unit tests as a minimum. Component/UI testing not necessary
- Try to keep the code as clean, readable, and DRY as possible
- Efficiency isn't a main concern here, but a solution is certainly possible in
  `Θ(n)` time complexity per generation

## Running it

Note: this project was bootstrapped with
[Create React App](https://github.com/facebookincubator/create-react-app).

1.  Fork this repository to your personal GitHub account. (It's a private repo,
    so it won't show up publicly in your profile.) Or, just clone it locally.
2.  Run `yarn install` in this directory to install the necessary packages.
3.  Run `yarn test` in a separate terminal pane to run the tests and keep them
    running live when files change
4.  Run `yarn start` to see your end result!
