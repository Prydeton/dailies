import { Header } from '/src/components'
import styles from './Privacy.module.css'

const Privacy = () => (
  <>
    <Header />
    <main className={styles.pageContainer}>
      <h2>Privacy Policy</h2>
      <p>
        This SERVICE is provided by Maxwell Reid at no cost and is intended for use as is.This page is used to inform
        visitors regarding the policies of the collection, use, and disclosure of Personal Information if using the
        Service.
      </p>
      <p>
        If you choose to use the Service, then you agree to the collection and use of information in relation to this
        policy. The Personal Information that is collected is used for providing and improving the Service. Your
        information will not be used or shared with anyone except as described in this Privacy Policy.
      </p>

      <h3>Information Collection and Use</h3>
      <p>The Service uses third party services that may collect information used to identify you.</p>
      <p>Links to privacy policies of the third party service providers used by the Service:</p>
      <ul>
        <li>
          <a href="https://supabase.com/privacy">Supabase</a>
        </li>
        <li>
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement">GitHub</a>
        </li>
      </ul>

      <h3>Security</h3>
      <p>
        Personal Information that is shared via the Service is protected, however remember that no method of
        transmission over the internet, or method of electronic storage is 100% secure and reliable, so take care when
        sharing Personal Information.
      </p>

      <h3>Childrens Privacy</h3>
      <p>
        The Service does not address anyone under the age of 13. Personally identifiable information is not knowingly
        collected from children under 13. If discovered that a child under 13 has provided the Service with personal
        information, such information will be immediately deleted from the servers. If you are a parent or guardian and
        you are aware that your child has provided the Service with personal information, please contact us using the
        details below so that this information can be removed.
      </p>

      <h3>Controlling your data</h3>
      <p>
        If you would like to delete your data from the service, navigate to the settings panel whilst log in and select
        "Delete Account".
      </p>

      <h3>Changes to Privacy Policy</h3>
      <p>
        This Privacy Policy may be updated from time to time. Thus, you are advised to review this page periodically for
        any changes. Last updated: 2023-06-10
      </p>

      <h3>Contact Me</h3>
      <p>
        If you have any questions or suggestions about the Privacy Policy, do not hesitate to contact me at
        maxwellreid.tech@gmail.com.
      </p>
    </main>
  </>
)

export default Privacy
