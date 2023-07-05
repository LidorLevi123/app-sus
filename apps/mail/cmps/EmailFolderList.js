export default {
    template: `
        <aside class="email-folder-list">
            <ul class="clean-list">
                <li>
                    <span class="material-symbols-outlined">inbox</span><h4>Inbox</h4>
                </li>
                <li>
                    <span class="material-symbols-outlined">star</span><h4>Starred</h4>
                </li>
                <li>
                    <span class="material-symbols-outlined">send</span><h4>Sent</h4>
                </li>
                <li>
                    <span class="material-symbols-outlined">draft</span><h4>Draft</h4>
                </li>
                <li>
                    <span class="material-symbols-outlined">delete</span><h4>Trash</h4>
                </li>
            </ul>
        </aside>
    `,
    name: 'EmailFolderList',
}