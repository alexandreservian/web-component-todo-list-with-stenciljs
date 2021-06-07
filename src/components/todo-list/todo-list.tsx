import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.css',
  shadow: true,
})
export class TodoList {
  /**
   * Define title of component
   */
  @Prop() title: string;

  /**
   * Define anotations array
   */
  @State() anotations: Array<string> = [];

  /**
   * Define value input
   */
  @State() value: string = '';

  private handleOnSubmit = (e: Event): void => {
    e.preventDefault();
    if (this.value.trim()) {
      this.anotations = [...this.anotations, this.value];
      this.value = '';
    }
  };

  private handleChange = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
  };

  private handleClick = (index: number) => (): void => {
    const newAnotations = this.anotations.filter((_, indexAnotation) => indexAnotation !== index);
    this.anotations = [...newAnotations];
  };

  render() {
    const { title, anotations, handleOnSubmit, value, handleChange, handleClick } = this;
    return (
      <Host>
        <div class="container">
          <h1>{title}</h1>
          <form onSubmit={handleOnSubmit}>
            <input type="text" name="anotation" value={value} onInput={handleChange} />
            <button class="button-add" type="submit">
              Add
            </button>
          </form>
          <ul>
            {anotations.map((anotation, index) => (
              <li>
                <p>{anotation}</p>
                <button class="button-remove" type="click" onClick={handleClick(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Host>
    );
  }
}
