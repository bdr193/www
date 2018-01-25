class Stories extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeItem: 1,
      transition: false,
      exitingItem: null
    }
  }

  render() {
    var detailClasses = classNames({
      'story-detail': true,
      'is-active': this.state.transition
    })

    return (
      <div className='story-overlay'>
        <div className='container story-label-container'>
          <div className='story-label hidden-xs hidden-sm'>
            <i className="mdi mdi-heart"></i>
          </div>
          <div className='stories-title'>
            <span>{this.props.i18n.title}</span>
            <span className="story-label-subtitle">{this.props.i18n.subtitle}</span>
          </div>
        </div>
        {this.props.stories.map((story, index) => {
          var backgroundStyle = {
            backgroundSize: "cover !important",
            backgroundImage: "url('" + story.thumbnail + "')"
          }

          var detailClasses = classNames({
            'story-detail hidden-sm hidden-xs': true,
            'is-active':  index + 1 == this.state.activeItem,
            'is-exiting': index + 1 == this.state.exitingItem
          })

          return(
            <div className={detailClasses} key={index}>
              <div className='story-detail-background' style={backgroundStyle}>
              </div>
            </div>
          )
        })}
          <div className='container'>
           <div className='story'>
            <div className='story-list'>
              {this.props.stories.map((story, index) => {
                return <StoriesItem {... story}
                  index={index}
                  key={index}
                  i18n={this.props.i18n}
                  activeItem={this.state.activeItem}
                  locale={this.props.locale}/>
              })}
              <a href={this.props.storiesPath} className="btn stories-link hidden-xs hidden-sm">{this.props.i18n.read_all}</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    PubSub.subscribe('updateActiveItem', (msg, index) => {
      this.setState({
        activeItem: index.new,
        exitingItem: index.old
      })
    })
  }
}

Stories.propTypes = {
  stories: React.PropTypes.array,
  storiesPath: React.PropTypes.string,
  locale: React.PropTypes.string,
  i18n: React.PropTypes.object,
}

