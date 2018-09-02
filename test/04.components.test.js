import test from "ava";
import "./_browser-mock";
/** @jsx createElement */
import { render, createElement, Component } from "../src/didact";

test.beforeEach(t => {
  let root = document.getElementById("root");
  if (!root) {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  }
  t.context.root = root;
});

test("render component", t => {
  const root = t.context.root;
  class FooComponent extends Component {
    render() {
      return (
        <div>
          <b />
          <a href="foo" />
        </div>
      );
    }
  }
  render(<FooComponent />, root);
  t.is(root.innerHTML, '<div><b></b><a href="foo"></a></div>');
});

test("render component with props", t => {
  const root = t.context.root;
  class FooComponent extends Component {
    render() {
      return (
        <div>
          <b>{this.props.name}</b>
          <a href="foo" />
        </div>
      );
    }
  }
  render(<FooComponent name="Bar" />, root);
  t.is(root.innerHTML, '<div><b>Bar</b><a href="foo"></a></div>');
});


test("render nested component", t => {
  const root = t.context.root;
  class ItemComponent extends Component {
    render() {
      return (
        <li>
          <div id='item'>
            {this.props.name}
          </div>
        </li>
      );
    }
  }

  class ListComponent extends Component {
    render() {
      return (
      <div id='list'>
        <ul>
          {
            [1, 2].map(name => {
              return <ItemComponent name={name} />
            })
          }
        </ul>
      </div>
      )
    }
  }

  render(<ListComponent />, root);
  t.is(root.innerHTML, '<div id="list"><ul><li><div id="item">1</div></li><li><div id="item">2</div></li></ul></div>');
});
