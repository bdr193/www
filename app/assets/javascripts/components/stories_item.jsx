class StoriesItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: this.props.active
    }
  }

  render() {
    var componentClasses = classNames({
      'story-item': true,
      'is-active': (this.props.index + 1) == this.props.activeItem
    })

    var title = this.props.title;
    var summary = this.props.description;

    var logo = null;
    if (this.props.company) {
      var logo = <img className='pull-right story-item-batch' src={this.props.company.logo} />;
      var link = <a href={this.props.company.url} target="_blank" className="story-company-link"></a>;
    }
    if (this.props.alumnus.first_name[0].match(/[aeiouy]/i)){
      var link = this.props.i18n.read_next_vowel.replace('::name::', this.props.alumnus.first_name);
    } else {
      var link = this.props.i18n.read_next_consumn.replace('::name::', this.props.alumnus.first_name);
    }

    return(
      <div className="story-container" onMouseEnter={this.handleClick.bind(this)} onClick={this.handleClick.bind(this)}>
        <div className="story-card">
          <main>
            <div className="story-card-title">
              {title}
            </div>
            <div className="story-card-summary">
              <div dangerouslySetInnerHTML={{__html: summary}} />
            </div>
            <div className='story-card-footer story-card-footer-home'>
              <div className="story-banner-user">
                <div className="story-user-avatar">
                  <img src={this.props.alumnus.official_avatar_url} />
                </div>
                <div className="story-banner-infos">
                  <div className="story-user-name">
                    <span>Featuring</span> {this.props.alumnus.first_name} {this.props.alumnus.last_name}
                  </div>
                  <div className="story-user-batch">
                    Batch #{this.props.alumnus.camp.slug}, {this.props.alumnus.city.name}
                  </div>
                </div>
                <img className="story-company-logo" src={this.props.company.logo} />
              </div>
            </div>
          </main>
          <a href={Routes.story_path(this.props.slug, { locale: this.props.locale })} className="story-card-cover-link">
          </a>
        </div>
      </div>


    )
  }

  handleClick() {
    if(this.props.activeItem !== this.props.index + 1) {
      PubSub.publish('updateActiveItem', {new: this.props.index + 1, old: this.props.activeItem})
    }
  }
}
