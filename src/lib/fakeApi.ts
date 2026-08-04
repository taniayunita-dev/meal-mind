/**
 * Mensimulasikan latency network. Dipakai oleh SEMUA service (auth, recipe)
 * agar loading state di UI terasa genuine, bukan instant/palsu.
 */
export function simulateDelay(ms = 500) : Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Mensimulasikan kemungkinan kegagalan network secara acak.
 * Berguna untuk memastikan error state benar-benar teruji,
 * bukan cuma "happy path" yang selalu berhasil.
 *
 * @param probability - peluang gagal, antara 0 (tidak pernah) - 1 (selalu)
 */

export function simulateRandomNetworkFailure(probability = 0) : boolean {
    return Math.random() < probability
}