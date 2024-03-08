export default function getBasePath() : string {
    return process.env.BASE_URL ?? ''
}