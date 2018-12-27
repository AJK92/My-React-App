import * as React from 'react';
import BackArrow from './../../Assets/Back.png'
import SeacrhIcon from './../../Assets/search.png'
import { Gallery } from './../../Model'
import { getGalleryList } from './../../Actions/gallery-actions'
import { connect } from 'react-redux'
import { GalleryListCell } from './components/gallery-list-cell'

export interface HomeState {
    galleryList: Array<Gallery>,
    count: number,
    isImageLoaded: boolean,
    isSearch: boolean
}

export interface HomeProps {
    galleryList: Array<Gallery>
    onGetGalleryList(value: string): void
}

class Home extends React.Component<HomeProps, HomeState> {

    constructor(props: any) {
        super(props)
        this.state = {
            galleryList: this.props.galleryList || [],
            count: 1,
            isImageLoaded: false,
            isSearch: false
        }
    }

    // React Life Cycle Methods
    componentDidMount() {
        this.dispatchAction()
    }

    componentWillReceiveProps(nextProps: any) {
        this.setState({
            galleryList: nextProps.galleryList
        })
    }

    // Calculate scroll height 

    trackScrolling = (event: any) => {
        let scrollComponent = event.target
        if (scrollComponent.offsetHeight + scrollComponent.scrollTop >= scrollComponent.scrollHeight - 5) {
            this.dispatchAction()
        }
    }

    // Method to fetch Gallery list
    dispatchAction() {
        if (this.state.count <= 3) {
            if (this.props.onGetGalleryList) {
                this.props.onGetGalleryList(this.state.count.toString())
                this.setState({
                    count: this.state.count + 1
                })
            }
        }
    }

    // Filtring function for search
    onSearchText = (event: any) => {
        let value = event.target.value || ''

        let searchResult = (this.props.galleryList || []).filter((item) => {
            return ((item.name || '').toLowerCase()).includes(value)
        })

        this.setState({
            galleryList: searchResult
        })
    }

    // Button actions
    onSearchButtonTapped = () => {
        this.setState({
            isSearch: true
        })
    }

    onBackButtonTapped = () => {
        this.setState({
            isSearch: false,
            galleryList: this.props.galleryList

        })
    }

    // Header view rendering
    renderHeader() {
        return <div className="flex flex-wrap pt-3 w-full h-16 bg-header-image">
            <div className="flex flex-auto px-3 pt-2 items-center justify-between">
                <div className="items-center flex h-auto w-4/5">
                    <img src={BackArrow} className="h-4 w-4" alt="Back" onClick={this.onBackButtonTapped} />
                    {!this.state.isSearch ? <span className="px-3 tex-sm text-white">Romantic Comedy</span>
                        : <input autoFocus className="outline-none w-full pl-1 rounded-sm ml-3 py-1 border-solid border-all-2" type="text" onChange={this.onSearchText} />}
                </div>
                <div className="h-auto w-auto">
                    <img src={SeacrhIcon} className="h-4 w-4" alt="Search" onClick={this.onSearchButtonTapped.bind(this)} />
                </div>
            </div>
        </div>
    }

    // List view rendering
    renderGalleryList() {

        let innerGalleryCell = this.state.galleryList.map((dataItem, index) => {
            return <GalleryListCell key={index} imageUrl={dataItem.imageUrl || ''} name={dataItem.name || ''} />
        })

        return <div className="h-full text-xs bg-black overflow-y-auto" onScroll={this.trackScrolling}>
            <div className="flex pt-3 pl-3 flex-wrap">
                {innerGalleryCell}
            </div>
        </div>
    }

    // Main render
    render() {
        return <div className="flex w-full font-light h-full sm:tex-lg">
            <div className="flex flex-col h-full flex-auto">
                {this.renderHeader()}
                {this.renderGalleryList()}
            </div>
        </div>
    }
}

const maptStateToProps = (state: any) => {
    return {
        galleryList: state.galleryList
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        onGetGalleryList: (value: string) => dispatch(getGalleryList(value))
    }
}

export default connect(maptStateToProps, mapDispatchToProps)(Home)