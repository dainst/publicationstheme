{**
 * templates/frontend/components/authors.tpl
 *
 * Copyright (c) 2014-2021 Simon Fraser University
 * Copyright (c) 2003-2021 John Willinsky
 * Distributed under the GNU GPL v3. For full terms see the file docs/COPYING.
 *
 * @brief Display authors of book or chapter
 *
 * @uses $monograph Monograph The monograph to be displayed
 * @uses $authors Array List of authors associated with this monograph or chapter
 * @uses $editors Array List of editors for this monograph if this is an edited
 *       volume. Otherwise empty.
 * @uses $isChapterRequest bool Is true, if a chapter landing page is requested and not a monograph landing page
 *}

<div class="item authors">
	<h2 class="pkp_screen_reader">{translate key="submission.authors"}</h2>

		{assign var="authors" value=$publication->getData('authors')}

		{* Show short author lists on multiple lines *}
		{if $authors|@count < 50}

			{* author lists *}
			<h2 class="label" style="margin-top: 2vh;">{translate key="submission.contributors"}</h2>

			{* Show short list of authors as main contributors *}
				<ul class="contributors">

			{foreach from=$authors item=author}

			{* get roleName of each author = contributor*}
			{$roleName = $author->getLocalizedUserGroupName()}

				<li>
					{* add author names *}
					<span class="name">{$author->getFullName()|escape} 
						<span class="role">[{$roleName|escape}]</span>
					</span>

					{* add orcid*}
					{if $author->getOrcid()}
						<span class="orcid">
						<a href="{$author->getOrcid()|escape}" target="_blank">
							{$author->getOrcid()|escape}
						</a>
					</span>
					{/if}

					{* add affiliation*}
					{if $author->getLocalizedAffiliation()}
						<span class="affiliation">
						{$author->getLocalizedAffiliation()|escape}
					</span>
					{/if}
				</li>
			
			{/foreach}
			</ul>

		{* Show long author lists on one line *}
		{else}
			{foreach name="authors" from=$authors item=author}
				{* strip removes excess white-space which creates gaps between separators *}
				{strip}
					{if $author->getLocalizedAffiliation()}
						{if $identifyAsEditors}
							{capture assign="authorName"}<span class="label">{translate key="submission.editorName" editorName=$author->getFullName()|escape}</span>{/capture}
						{else}
							{capture assign="authorName"}<span class="label">{$author->getFullName()|escape}</span>{/capture}
						{/if}
						{capture assign="authorAffiliation"}<span class="value">{$author->getLocalizedAffiliation()|escape}</span>{/capture}
						{translate key="submission.authorWithAffiliation" name=$authorName affiliation=$authorAffiliation}
					{else}
						<span class="label">{$author->getFullName()|escape}</span>
					{/if}
					{if !$smarty.foreach.authors.last}
						{translate key="submission.authorListSeparator"}
					{/if}
				{/strip}
			{/foreach}
		{/if}

</div>