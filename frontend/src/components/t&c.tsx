import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-semibold mb-6 dark:text-white">Terms and Conditions</h1>
            <div className="space-y-6 dark:text-gray-300">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">1. General Terms</h2>
                    <p>
                        By using this platform, you agree to the following terms and conditions. Please read them carefully. These terms govern all transactions and interactions on the book exchange platform, including purchasing, renting, and exchanging books.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">2. Renting Books</h2>
                    <p>
                        When renting books from our platform, you agree to return the rented book within a period of <strong>1 month</strong> from the rental date. Failure to return the book within this period may result in penalties or additional fees.
                    </p>
                    <p>
                        If you wish to extend the rental period, you must request an extension before the original return date. Extensions may be granted at the discretion of the platform.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">3. Book Condition</h2>
                    <p>
                        Books rented or exchanged through our platform must be maintained in <strong>good condition</strong>. You are responsible for handling books with care to prevent damage such as torn pages, writing or highlighting in the books, water damage, or any other deterioration.
                    </p>
                    <p>
                        If a book is returned in a damaged condition, you may be charged a fee for repair or replacement based on the severity of the damage.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">4. Purchasing Books</h2>
                    <p>
                        When purchasing books from our platform, all sales are considered final. Once the book has been shipped, cancellations are not allowed. In the case of damaged or incorrect books, contact us within 7 days to arrange for a replacement or refund.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">5. Exchange Feature</h2>
                    <p>
                        The book exchange feature allows users to buy/rent books with other users. Both parties must ensure the books being exchanged are in good condition. Any disputes over book condition must be resolved between the users. The platform is not responsible for the condition of exchanged books.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">6. Late Fees and Penalties</h2>
                    <p>
                        For books not returned within the stipulated rental period of 1 month, late fees may be applied. The exact amount will depend on the duration of the delay and will be communicated to you upon request.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">7. User Responsibility</h2>
                    <p>
                        As a user, you are responsible for providing accurate and up-to-date information, including delivery address and payment details. Failure to do so may result in delays or issues with your order.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">8. Platform Rights</h2>
                    <p>
                        We reserve the right to refuse service, cancel orders, or terminate accounts if we suspect fraudulent activity, violation of these terms, or abuse of the platform.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">9. Amendments</h2>
                    <p>
                        These terms and conditions may be updated periodically. Users will be notified of any significant changes, and continued use of the platform after such updates constitutes acceptance of the revised terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
                    <p>
                        If you have any questions regarding these terms or any issues with your orders, feel free to contact our support team at support@bookswap.com.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TermsAndConditions;
