class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jump: false,
      selectedProduct: this.props.selectedProductSlug === null ? null :
        _.filter(this.props.products, (p) => { return p.slug == this.props.selectedProductSlug })[0]
    }
  }
  render() {
    var batch = this.props.batch;
    var products = this.props.products;
    var i18n = this.props.i18n;
    var product_icon = this.props.product_icon;

    var main = null;
    if (this.props.batch.demoday_youtube_id) {
      main = <PlayerVideo
                autoPlay={this.props.autoPlay}
                jump={this.state.jump}
                i18n={this.props.i18n}
                youtubeVideoId={this.props.batch.demoday_youtube_id}
                selectedProduct={this.state.selectedProduct}
                reportCurrentTime={this.reportCurrentTime} />
    } else {
      if (!this.props.batch.cover_image_url) {
        var noCoverStyle = {
          backgroundImage: "url(" + this.props.videoPlaceholder + ")"
        }
        main = <div className="player-placeholder" style={noCoverStyle}>
                <span>{this.props.i18n.no_video}</span>
               </div>
      } else {
        var coverStyle = {
          backgroundImage: "url(" + this.props.batch.cover_image_url + ")"
        }
        main = <div className="player-placeholder" style={coverStyle}>
                <span>{this.props.i18n.no_video}</span>
               </div>
        }
    }

    var footerNavigation = null;
    if (products.length > 0) {
      footerNavigation = <PlayerNavigationList products={products} selectedProduct={this.state.selectedProduct}
           goToProduct={this.goToProduct} />;
    }

    return (
      <div className="player-container">
        <PlayerHeader batch={batch} i18n={i18n} product_icon={product_icon} flag_icon={this.props.flag_icon} products={this.props.products} />
        <div className="player-content">
          {main}
          <PlayerProduct technos={this.props.technos} batch={batch} product={this.state.selectedProduct} i18n={i18n} students={this.props.students} />
        </div>
        {footerNavigation}
      </div>
    )
  }

  goToProduct = (product, jump) => {
    this.setState({ selectedProduct: product, jump: jump });
    if (product === null || product === ':intro:') {
      var path = this.props.demodayPath;
      var title = this.props.i18n.page_title.replace('%{batch_slug}', this.props.batch.slug)
                                            .replace('%{city_name}', this.props.batch.city.name);
    } else {
      var path = this.props.withSlugDemodayPath.replace(':slug', product.slug);
      var title = this.props.i18n.page_title_with_selected_product
        .replace('%{product_name}', product.name)
        .replace('%{batch_slug}', this.props.batch.slug)
        .replace('%{city_name}', this.props.batch.city.name);
    }

    document.title = title;
    history.replaceState({}, title, path);
  }

  reportCurrentTime = (time) => {
    var currentProduct = null;
    var products = this.props.products;
    for (var i = 0; i < products.length; i++) {
      var product = products[i];
      if (product.demoday_timestamp > 0 && product.demoday_timestamp <= time && (i == products.length - 1 || time < products[i + 1].demoday_timestamp)) {
        currentProduct = product;
        break;
      }
    }

    if (this.state.selectedProduct !== currentProduct && currentProduct !== null) {
      this.goToProduct(currentProduct, false);
    }
  }
}
