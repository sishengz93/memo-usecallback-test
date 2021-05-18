import React from 'react';
import './style.css';

const data = [
  {
    name: 'Button 1',
    id: 1
  },
  {
    name: 'Button 2',
    id: 2
  }
];

const Button = ({ handle, name }) => {
  console.log('Button rendered');
  return <button onClick={handle} value={name}>{name} </button>;
};

const List = ({ onHandle, items }) => {
  console.log('List rendered');
  return items.map(({ name, id }) => {
    return <Button key={id} handle={onHandle} name={name} />;
  });
};

const ListMemo = React.memo(List);

export default function App() {
  const [items, setItems] = React.useState([]);
  const [selected, setSelected] = React.useState('');
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setItems(data);
  }, []);

  const handle = React.useCallback((event) => {
    console.log(`${event.target.value} clicked`);
    console.log(count);
    setSelected(event.target.value);
  }, [items]);

  const increment = () => {
    setCount(count + 1);
  }

  const addButton = () => {
    setItems([...items, { name: 'Button 3', id: Math.random() }]);
  }

  return (
    <div>
      <ListMemo onHandle={handle} items={items} />
      Selected: { selected }
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <button onClick={increment}>Increment</button>
      <h4>
        {count}
      </h4>

      <button onClick={addButton}> add button </button>
    </div>
  );
}
