import { observe, tag, WeElement } from 'omi'
import './list'

@observe
@tag('input-autocomplete')
class MyApp extends WeElement {

    static get data() {
        return { items: [], selected: [], text: '' }
    }

    css () {
        return `
        .search-field {
            box-sizing: border-box;
            width: 50%;
            font-size: 130%;
            border: 1px solid #ddd;
            border-radius: 4px;
            color: #777;
        }
        .search-field {
            display: block;
            margin: 1em auto 0;
            padding: 10px;
            outline: blue;
        }
        .search-field:focus {
            border-color: #008eff;
            box-shadow: 0px 0px 0px 1px #008eff;
            outline: none;
        }`
    }

    async installed() {
        let response = await fetch('https://demo.vaadin.com/demo-data/1.0/countries')

        this.data.items = (await response.json())
    }

    searchForCountry = event => {
        this.data.text = event.target.value

        this.data.selected = this.data.items
                                 .filter(item => item.toLowerCase().includes(this.data.text.toLowerCase()))
    }

    onItemClick = ({ itemText }) => {
        this.data.text = itemText
        this.data.selected = []
    }

    render(props, data) {
        return (
            <div>
                <input class='search-field' placeholder='Start typing a country name...' value={data.text} onInput={this.searchForCountry}/>
                {
                    data.selected.length > 0 &&
                    <input-list text={data.selected} onItemClick={this.onItemClick}/>
                }
            </div>
        )
    }
}
