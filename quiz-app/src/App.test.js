import { render as rtlRender, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from "./store/perStore";
import { MemoryRouter } from "react-router-dom";
import QuestionFirst from "./components/QuestionFirst";
import Home from './components/Home'
const render = (component) => rtlRender(
  <Provider store={store}>
    <MemoryRouter>
      {component}
    </MemoryRouter>
  </Provider>)


const renderHome = () => render(<Home />);
const renderQuestionFirst = () => render(<QuestionFirst />);

test("heading of Home include in document", () => {
  let { getByTestId } = renderHome();
  const HomeElement = getByTestId('home-heading')
  expect(HomeElement).toBeInTheDocument();
  expect(HomeElement).toHaveTextContent("Quiz App");
})


test("start Quiz button label", () => {
  let { getByTestId } = renderHome();;
  const btnElement = getByTestId('start-btn')
  fireEvent.click(btnElement);
  expect(btnElement).toHaveTextContent("Start Quiz");
})

// test("next button label", () => {
//   let { getByTestId } = renderQuestionFirst();;
//   const btnElement = getByTestId('next-btn')
//   fireEvent.click(btnElement);
//   expect(btnElement).toHaveTextContent("Next");
// })
