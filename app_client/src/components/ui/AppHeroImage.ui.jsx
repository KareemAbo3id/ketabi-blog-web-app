import PropTypes from "prop-types";

function AppHeroImage(props) {
    const { heroImageTitle } = props;
    return (
        <img
            src={heroImageTitle}
            height={200}
            style={{
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: 10,
            }}
        />
    );
}

AppHeroImage.propTypes = {
    heroImageTitle: PropTypes.string.isRequired,
};

export default AppHeroImage;
