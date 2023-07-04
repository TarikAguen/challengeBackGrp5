const { getTab, getNb } = require("../../controllers/post.controller");
const router = express.Router();

router.get("/", getTab);
router.get("/nb", getNb);

module.exports = router;
