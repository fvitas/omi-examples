import { tag, WeElement } from 'omi'

@tag('input-list', true)
export class List extends WeElement {

    css () {
        return `
        .input-list {
            box-sizing: border-box;
            width: 50%;
            font-size: 130%;
            border: 1px solid #ddd;
            border-radius: 4px;
            color: #777;
        }
        .input-list {
            margin: 5px auto;
            padding: 0;
            text-align: left;
            background: #fff;
            list-style: none inside;
        }
        li {
            padding: 3px 10px;
        }
        li:hover {
            background: rgba(200, 200, 200, 0.3);
        }`
    }

    itemClicked = event => {
        this.props.onItemClick({ itemText: event.target.textContent })
    }

    render(props) {
        return (
            <ul className='input-list'>
                { props.text.map(item => <li key={item} onClick={this.itemClicked}>{item}</li>) }
            </ul>
        )
    }
}

