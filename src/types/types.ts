export type Filter = 'all' | 'active' | 'completed';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type Todos = Todo[];

export type ButtonProps = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  filterType: Filter;
  text: string;
};

export type InputProps = {
  todos: Todos;
  setTodos: (value: Todos) => void;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
};

export type StatusProps = {
  activeTodos: Todos;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  clearCompleted: () => void;
};

export type ListProps = {
  isExpanded: boolean;
  filteredTodos: Todos;
  toggleTodo: (id: number) => void;
};
