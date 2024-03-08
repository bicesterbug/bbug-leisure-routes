export default function getBasePath() : string {
    return process.env.NEXT_PUBLIC_BASE_URL ?? ''
}