const app = express()
const port = config.port
const apiRoutes = express.Router()

app.use(bodyParser.json())
app.use(
    session({
        secret: "walletcheckerbymunris",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, httpOnly: true, maxAge: 360000000 }
    })
)

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    if (username === config.auth.login && password === config.auth.password) {
        req.session.isAuthenticated = true
        req.session.username = username
        res.json({ message: "Login successful" })
    } else {
        res.status(401).json({ message: "Invalid credentials" })
    }
})

function isAuthenticated(req, res, next) {
    if (!config.auth.enabled) {
        next()
    } else {   
        if (req.session.isAuthenticated) {
            next()
        } else {
            res.sendStatus(401)
        }
    }
}

app.use(cors())
app.use('/api', apiRoutes)

app.use(express.static('./web/dist'))

app.get('*', (req, res) => {
    res.sendFile('./web/dist/index.html')
})

apiRoutes.get('/stats', async (req, res) => {
    const zksyncWallets = readWallets(config.modules.zksync.addresses)
    const layerzeroWallets = readWallets(config.modules.layerzero.addresses)
    const wormholeWallets = readWallets(config.modules.wormhole.addresses)
    const debridgeWallets = readWallets(config.modules.debridge.addresses)
    const zkbridgeWallets = readWallets(config.modules.zkbridge.addresses)
    const hyperlaneWallets = readWallets(config.modules.hyperlane.addresses)
    const zoraWallets = readWallets(config.modules.zora.addresses)
    const baseWallets = readWallets(config.modules.base.addresses)
    const aptosWallets = readWallets(config.modules.aptos.addresses)
    const lineaWallets = readWallets(config.modules.linea.addresses)
    const scrollWallets = readWallets(config.modules.scroll.addresses)
    const polygonzkevmWallets = readWallets(config.modules.polygonzkevm.addresses)
    const clustersWallets = readWallets(config.modules.clusters.addresses)
    const rabbyWallets = readWallets(config.modules.rabby.addresses)
    const evmWallets = readWallets(config.modules.evm.addresses)
    const balanceWallets = readWallets(config.modules.balance.addresses)
    const nftWallets = readWallets(config.modules.nft.addresses)
    const galxeWallets = readWallets(config.modules.galxe.addresses)
    const jumperWallets = readWallets(config.modules.jumper.addresses)
    const storyWallets = readWallets(config.modules.story.addresses)
    const eclipseWallets = readWallets(config.modules.eclipse.addresses)
